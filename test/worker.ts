import globby = require("globby");
import { IOpt, InternalOptType } from "../src/interface/projectInterfaces";
import mkdirp = require("mkdirp");
import * as fs from 'fs';
import * as path from 'path';
import { Util } from "../src/util/Util";
import { BuildProcess } from "../src/BuildProcess";
import { FancyLogger } from "./fancy.logger";
import { ILogger } from "../src/interface/projectInterfaces";
import { LoggerNull } from "../src/log/LoggerNull";
import { LoggerSimple } from "../src/log/LoggerSimple";
import { LoggerEvent } from "../src/log/LoggerEvent";
import { LogEvents } from "./LogEvents";
import * as appRoot from 'app-root-path';

export class TestWorker {
  public verbose: boolean = false;
  public outPath: string = '';
  public outFile: string = '';
  /**
   * Construts new instance of class
   * @param outTestPath The relative test path from the current process.
   * eg: ../scratch/test
   */
  constructor(outTestPath: string) {
    this.outPath = outTestPath.replace(/\//g, path.sep);
    // this.outPath = path.join(process.cwd(), this.outPath);
  }

  public getOption<T extends InternalOptType>(localOpt: IOpt, key: string, defaultVal: T): T {
    if (!localOpt.internal) {
      localOpt.internal = {};
    }
    const interanlVal = localOpt.internal[key];
    if (typeof interanlVal === typeof defaultVal) {
      return <T>interanlVal;
    }
    return defaultVal;
  }

  public setOption(localOpt: IOpt, key: string, value: InternalOptType) {
    if (!localOpt.internal) {
      localOpt.internal = {};
    }
    localOpt.internal[key] = value;
  }
  private getLogger(opt: IOpt): ILogger {
    const strLogger = this.getOption<string>(opt, 'logger', 'fancy');
    let logger: ILogger;
    switch (strLogger) {
      case 'null':
        logger = new LoggerNull();
        break;
      case 'simple':
        logger = new LoggerSimple();
        break;
      case 'event':
        logger = new LoggerEvent();
        break;
      default:
        logger = new FancyLogger();
        break;
    }
    return logger;
  }
  /**
   * 
   * @param inGlob Path glob sucha as test/**.txt or relative path such as test/mytext.txt
   * @param dest Destionation path for the output
   * @param opt Options for grunt.
   */
  public doWork(inGlob: string, dest: string, opt: IOpt) {
    const logger = this.getLogger(opt);
    logger.isVerbose = this.verbose;
    let destPath = dest.replace(/\//g, path.sep);
    let isFilePath = false;
    let dirPath = '';

    if (this.isDir(destPath)) {
      dirPath = destPath;
    } else {
      isFilePath = true;
      dirPath = path.dirname(destPath);
    }
    if (path.isAbsolute(dirPath)) {
      dirPath = this.joinRootPath(dirPath);
    } else {
      dirPath = path.join(process.cwd(), dirPath)
    }
    mkdirp.sync(dirPath);
    let logMonitior: LogEvents;
    if (logger instanceof LoggerEvent) {
      logMonitior = new LogEvents(logger);
    }
    const bp = new BuildProcess(logger);
    let paths: string[] = [];

    const doGlob = async () => {
      paths = await globby(inGlob);
    }

    if (fs.existsSync(inGlob) === true) {
      paths.push(inGlob);
    } else {
      doGlob(); // load paths as a glob;
    }

    // const paths = doGlob(inGlob);
    paths.map(p => {
      let outFile = isFilePath ? destPath : path.join(destPath, path.basename(p));
      if (path.isAbsolute(outFile)) {
        outFile = this.joinRootPath(outFile);
      } else {
        outFile = path.join(process.cwd(), outFile)
      }
      this.outFile = outFile;
      if (fs.existsSync(outFile)) {
        fs.unlinkSync(outFile);
      }
      let contents = '';
      // see if flag has been set to load from srcPath by buildInclude
      const loadSrc = this.getOption<boolean>(opt, 'readSrc', true);
      if (loadSrc) {
        contents = fs.readFileSync(p, { encoding: Util.Encoding('utf8') });
      }
      try {
        const results = bp.buildInclude(contents, p, opt);

        fs.writeFileSync(outFile, results, { encoding: Util.Encoding('utf8') });
      } catch (err) {
        throw err;
      }



    });
  }

  /**
   * Gets Options from Json File
   * @param jsonPath Relative Path to json file such as `json/myopt.json`
   */
  public getOptions(jsonPath: string): IOpt {
    try {
      const p = jsonPath.replace(/\//g, path.sep);
      const opt: IOpt = JSON.parse(fs.readFileSync(p, { encoding: Util.Encoding('utf8') }));
      return opt;
    } catch (err) {
      throw err;
    }
  }

  private joinRootPath(strPath: string): string {
    let result = strPath;
    if (strPath.startsWith(appRoot.path) === false) {
      result = path.join(appRoot.path, strPath);
    }
    return result;
  }

  private isDir(strPath: string) {
    try {
      var stat = fs.lstatSync(strPath);
      return stat.isDirectory();
    } catch (e) {
      // lstatSync throws an error if path doesn't exist
      return false;
    }
  }
}

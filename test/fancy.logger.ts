import { ILogger, ILog } from "../src/interface/projectInterfaces";
import FLog = require("fancy-log");
import util = require("util");
import { EOL } from 'os';
class FancyLog implements ILog {
  public isVerbose: boolean = false;
  public preFix = '[Build-Include]: ';
  constructor() {
  }
  public error(...args: any[]): void {
    if (this.isVerbose === true) {
      FLog.error(this.preFix, this.foramted(...args));
    }
  }
  public write(...args: string[]): void {
    if (this.isVerbose === true) {
      process.stdout.write(this.foramted(...args));
    }
  }
  public writeln(...args: any[]): void {
    if (this.isVerbose === true) {
      // FLog(this.preFix, ...args);
      FLog(this.preFix, this.foramted(...args));
    }
  }
  public warn(...args: any[]): void {
    if (this.isVerbose === true) {
      FLog.warn(this.preFix, this.foramted(...args));
    }
  }
  public emptyln(): void {
   if (this.isVerbose === true) {
     process.stdout.write(EOL); 
   }
  }

  private foramted(...args:any[]): string {
    if (args.length === 0) {
      return '';
    }
    if (args.length === 1) {
      return new String(args[0]).toString();
    }
    // const arr = { ...args };
    const first: any = args.shift();
    return util.format(first, ...args);
  }
}

export class FancyLogger implements ILogger {

  constructor() {
    this.isVerbose = false;
    this.log.isVerbose = true;
  }
  log: FancyLog = new FancyLog();
  verbose: FancyLog = new FancyLog();

  /**
   * Gets if the verbose logger is logging,
   * If true verbose logger will log: Otherwise,
   * verbose logger will not log
   */
  public get isVerbose() {
    return this.verbose.isVerbose;
  }
  /**
  * Sets if the verbose logger is logging,
  * If true verbose logger will log: Otherwise,
  * verbose logger will not log
  */
  public set isVerbose(verbose: boolean) {
    this.verbose.isVerbose = verbose;
  }
}
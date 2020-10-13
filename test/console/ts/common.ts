
import { BuildProcess } from "../../../src/BuildProcess";
import { LoggerSimple } from "../../../src/log/LoggerSimple";
import fs = require("fs");
import path = require("path");
const jsonDir: string = '../json';
const getOptions = (jsonPath: string) => {
  try {
    let p = jsonPath.replace(/\//g, path.sep);
    p = path.join(__dirname,jsonDir ,p);
    const opt = JSON.parse(fs.readFileSync(p, { encoding: 'utf8' }));
    return opt;
  } catch (err) {
    throw err;
  }
}

export const common = {
  bp: new BuildProcess(new LoggerSimple()),
  getOptions: getOptions,
  path: path
};

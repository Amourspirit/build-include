
// import { BuildProcess } from "../../../dist/BuildProcess";
const BuildProcess = require('../../../dist/cjs/BuildProcess').BuildProcess;
// import { LoggerSimple } from "../../../dist/LoggerSimple";
const LoggerSimple = require('../../../dist/cjs/log/LoggerSimple').LoggerSimple;

const fs = require("fs");
const path = require("path");
const jsonDir = '../json';
const getOptions = (jsonPath) => {
  try {
    let p = jsonPath.replace(/\//g, path.sep);
    p = path.join(__dirname,jsonDir ,p);
    const opt = JSON.parse(fs.readFileSync(p, { encoding: 'utf8' }));
    return opt;
  } catch (err) {
    throw err;
  }
}

exports.common = {
  bp: new BuildProcess(new LoggerSimple()),
  getOptions: getOptions,
  path: path
};
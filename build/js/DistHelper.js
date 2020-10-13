'use strict';

const fh = require("./Files").Files;
const fs = require('fs');
const path = require("path");
const rootRelative = '../../';
const root = path.resolve(__dirname, rootRelative);
const packageJsonFile = path.join(root, 'package.json');

const pkg = JSON.parse(fs.readFileSync(packageJsonFile, {encoding: 'utf-8'}));

/**
 * Gets a object of paths to be used in the exports section of package.json 
 * @param {string} dirPath The directory used to read files from
 * @param {string} [parentDir] Optional parent directory to prepend to paths
 */
const getDirObj = (dirPath, parentDir) => {
  const absRel = fh.getAbsRelPaths(root, dirPath);
  const absPath = absRel.abs;

  const files = fh.getAllFiles(absPath, ['.js']);
  
  const dirObj = {};
  files.map(file => {
    // const tmp = file.substr(absPath.length + 1);
    let fRel = file.substr(absPath.length + 1); //path.join(rp, tmp);
    if (parentDir) {
      fRel = path.join(parentDir, fRel);
    }
    const extLen = path.extname(fRel).length;
    let kv = './' + fRel;
    dirObj[kv] = kv;
    const kv2 = kv.substr(0, kv.length - extLen);
    dirObj[kv2] = kv;
  });
  return dirObj;
};
class DistHelper {
/**
 * Get a javascript Object representing the package .json export and type for ESM
 * @returns {object}
 */
  static getDistObjEsm() {
    if (!pkg._out) {
      throw new Error(path.join(root, 'package.json') + ' file is expected to have _out property set to something like "dist"');
    }
    if (!pkg._outEsm) {
      throw new Error(path.join(root, 'package.json') + ' file is expected to have _outEsm property set to something like "{0}/esm"');
    }
    const outEsm = pkg._outEsm.replace("{0}", pkg._out);
    const esmObj = {};
    esmObj["exports"] = getDirObj(outEsm);
    esmObj.exports['./package.json'] = './package.json';
    esmObj.exports['./package'] = './package';
    esmObj["type"] = "module";
    return esmObj;
  }

  /**
   * Get a javascript Object representing the package .json export and type for CJS
   * @returns {object}
   */
  static getDistCjsObj() {
    if (!pkg._out) {
      throw new Error(path.join(root, 'package.json') + ' file is expected to have _out property set to something like "dist"');
    }
    if (!pkg._outCjs) {
      throw new Error(path.join(root, 'package.json') + ' file is expected to have _outCjs property set to something like "{0}/cjs"');
    }
    const outCjs = pkg._outCjs.replace("{0}", pkg._out);
    const cjsObj = {};
    cjsObj["exports"] = getDirObj(outCjs);
    cjsObj["type"] = "commonjs";
    return cjsObj;
  }

  /**
 * Get a javascript Object representing the package .json export and type for ESM and CJS
 * @returns {object}
 */
  static getDistObj() {
    if (!pkg._out) {
      throw new Error(path.join(root, 'package.json') + ' file is expected to have _out property set to something like "dist"');
    }
    if (!pkg._outEsm) {
      throw new Error(path.join(root, 'package.json') + ' file is expected to have _outEsm property set to something like "{0}/esm"');
    }
    const outEsm = pkg._outEsm.replace("{0}", pkg._out);
    const esmDir = outEsm.substr(pkg._out.length + 1);
    const exportsObj = getDirObj(outEsm, esmDir);

    const outCjs = pkg._outCjs.replace("{0}", pkg._out);
    const cjsDir = outCjs.substr(pkg._out.length + 1);
    const cjsObj = getDirObj(outCjs, cjsDir);
    for (const key in cjsObj) {
      if (cjsObj.hasOwnProperty(key)) {
        const el = cjsObj[key];
        exportsObj[key] = el;
      }
    }
    exportsObj["./" + esmDir] = "./" + esmDir;
    exportsObj["./" + cjsDir] = "./" + cjsDir;
    exportsObj['./package.json'] = './package.json';
    exportsObj['./package'] = './package';
    return exportsObj;
  }

  /**
   * Finalizes Json File
   * @param {string} jsonPath Path to json file
   * 
   * Inserts file exports into exports section.  
   * Remove all properties that start with _ (underscore)
   */
  static finalizeJsonPkg(jsonPath) {
    const absRel = fh.getAbsRelPaths(root, jsonPath);
    if (fs.existsSync(absRel.abs) === false) {
      throw new Error('File not found: ' + absRel.abs);
    }
    const jData = JSON.parse(fs.readFileSync(absRel.abs, { encoding: 'utf-8' }));
    // clean up any internal json values. Will not be needed in node package
    for (const key in jData) {
      if (jData.hasOwnProperty(key)) {
        if (key.startsWith("_")) {
          delete jData[key];
        }
      }
    }
    
    // build exports
    if (!jData.exports) {
      jData.exports = {};
    }
    const distEx = DistHelper.getDistObj();
    for (const key in distEx) {
      if (distEx.hasOwnProperty(key)) {
        const el = distEx[key];
        jData.exports[key] = el;
      }
    }
   
    fs.unlinkSync(absRel.abs);
    fs.writeFileSync(absRel.abs, JSON.stringify(jData), { encoding: "utf8" });
  }
}

// console.log(DistHelper.getDistObjEsm());
// console.log(DistHelper.getDistCjsObj());
// console.log(DistHelper.getDistObj());
// dist/package.json
// DistHelper.finalizeJsonPkg('dist/package.json');
exports.DistHelper = DistHelper;
import { buildInclude } from "../index";
import * as path from "path";
import * as fs from "fs";
import * as appRoot from 'app-root-path';
import mkdirp = require("mkdirp");
import { IOpt } from "../interface/projectInterfaces";

const testDir = path.join(appRoot.path, 'test');
const fixDir = path.join(testDir, 'fixtures');
const jsonDir = path.join(testDir, 'json');
const outDir = path.join(appRoot.path, 'scratch/test');

const copyTestFiles = () => {
  const testFiles: string[][] = [];
  testFiles.push([
    path.join(fixDir,'style.min.css'),
    path.join(appRoot.path, 'scratch/test/css/style.min.css')
  ]);
  testFiles.push([
    path.join(fixDir,'replace1.txt'),
    path.join(appRoot.path, '../scratch/test/replace1.txt')
  ]);
  // testFiles.push(['fixtures/sample01.js', '../scratch/test/sample_inline.js']);
  testFiles.map(pair => {
    const src = pair[0];
    const dest = pair[1];
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
    fs.copyFileSync(src, dest);
  });
};

const getOptions = (jsonPath: string): IOpt => {
  try {
    const p = jsonPath.replace(/\//g, path.sep);
    const opt: IOpt = JSON.parse(fs.readFileSync(p, { encoding: "utf-8" }));
    return opt;
  } catch (err) {
    throw err;
  }
}

const isFileSameAsContents = (f: string, contents: string): boolean => {
  const fileContents = fs.readFileSync(f, { encoding: 'utf-8' });
  return fileContents === contents;
}

mkdirp.sync(path.join(outDir, 'css'));
copyTestFiles();

describe('index buildInclude test', ()=> {
  it('Should load a file and return the same results', (done) => {
    const inPath = path.join(fixDir, 'replace1.txt');
    const results = buildInclude(inPath);
    expect(isFileSameAsContents(inPath, results)).toBeTruthy();
    done();
  });

  it('should load the source file when buildinclude contents are set to empty string', (done) => {
    const p = path.join(jsonDir, 'simple.json');
    const opt: IOpt = getOptions(p);
    const inPath = path.join(fixDir, 'simple.txt');

    const results = buildInclude(inPath, opt);
    const comparePath = path.join(fixDir, 'simple_replaced.txt');
    expect(isFileSameAsContents(comparePath, results)).toBeTruthy();
    done();
  });
});
import { MatchBracketInclude } from "../MatchBracketInclude";
import { MatchOptionsProcess } from "../../process/MatchOptionsProcess";
const inst = new MatchBracketInclude();
const proc = new MatchOptionsProcess();
proc.process(inst);

describe('Test Properties', () => {
  test('path', (done) => {
    expect.assertions(1);
    expect(inst.path).toBe('');
    done();
  });

  test('indexFile', (done) => {
    expect.assertions(1);
    expect(inst.indexFile).toBe(1);
    done();
  });

  test('indexParam', (done) => {
    expect.assertions(1);
    expect(inst.indexParam).toBe(2);
    done();
  });

  test('suffix', (done) => {
    expect.assertions(1);
    expect(inst.suffix).toBe('');
    done();
  });

  test('options', (done) => {
    expect.assertions(1);
    expect(inst.options).toBe('');
    done();
  });

  test('kind', (done) => {
    expect.assertions(1);
    expect(inst.kind).toBe('bracketInclude');
    done();
  });

  test('name', (done) => {
    expect.assertions(1);
    expect(inst.name).toBe('include:');
    done();
  });
});

describe('MatchOptionsProcess Properties', () => {
  test('MatchOptionsProcess name', (done) => {
    expect.assertions(1);
    proc.process(inst);
    expect(proc.name).toBe(inst.name);
    done();
  });

  test('MatchOptionsProcess isValid', (done) => {
    expect.assertions(1);
    expect(proc.isValid).toBeTruthy();
    done();
  });

  test('MatchOptionsProcess allowIndent', (done) => {
    expect.assertions(1);
    expect(proc.allowIndent).toBeTruthy();
    done();
  });
});

describe('MatchOptionsProcess.regexSimple', () => {
  test('MatchOptionsProcess.regexSimple match [[include:', (done) => {
    expect.assertions(1);
    expect(proc.regexSimple.test('[[include:')).toBeTruthy();
    done();
  });

  test('MatchOptionsProcess.regexSimple no match [[INCLUDE:', (done) => {
    expect.assertions(1);
    expect(proc.regexSimple.test('[[INCLUDE:')).toBeFalsy();
    done();
  });

  test('MatchOptionsProcess.regexSimple no match [include:', (done) => {
    expect.assertions(1);
    expect(proc.regexSimple.test('[include:')).toBeFalsy();
    done();
  });

  test('MatchOptionsProcess.regexSimple no match [•[include:', (done) => {
    expect.assertions(1);
    expect(proc.regexSimple.test('[ [include:')).toBeFalsy();
    done();
  });

  test('MatchOptionsProcess.regexSimple no match [[•include:', (done) => {
    expect.assertions(1);
    expect(proc.regexSimple.test('[[ include:')).toBeFalsy();
    done();
  });
});

describe('MatchOptionsProcess.regexMain', () => {
  test('MatchOptionsProcess.regexMain match [[include:Readme.md]]', (done) => {
    expect.assertions(2);
    const strFile = 'Readme.md';
    const strTest = `[[include:${strFile}]]`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
    }
    done();
  });

  test('MatchOptionsProcess.regexMain not match [[include:Readme.md••]]', (done) => {
    expect.assertions(1);
    expect(proc.regexMain.test('[[include:Readme.md  ]]')).toBeFalsy();
    done();
  });

  test('MatchOptionsProcess.regexMain not match [[include:<Readme.md]]', (done) => {
    expect.assertions(1);
    expect(proc.regexMain.test('[[include:<Readme.md]]')).toBeFalsy();
    done();
  });

  test('MatchOptionsProcess.regexMain not match [[include:<rootDir>Readme.md]]', (done) => {
    expect.assertions(1);
    expect(proc.regexMain.test('[[include:<rootDir>Readme.md]]')).toBeFalsy();
    done();
  });

  test('MatchOptionsProcess.regexMain no match [[include:•Readme.md••]]', (done) => {
    expect.assertions(1);
    expect(proc.regexMain.test('[[include: Readme.md  ]]')).toBeFalsy();
    done();
  });

  test('MatchOptionsProcess.regexMain match [[include:../includes/Readme.md]]', (done) => {
    expect.assertions(1);
    expect(proc.regexMain.test('[[include:./includes/Readme.md]]')).toBeTruthy();
    done();
  });

  test('MatchOptionsProcess.regexMain match [[include:../includes/Readme.md]](test)', (done) => {
    expect.assertions(1);
    expect(proc.regexMain.test('[[include:./includes/Readme.md]](test)')).toBeTruthy();
    done();
  });

  test('MatchOptionsProcess.regexMain match but ignore params [[include:./includes/Readme.md]](••test••)', (done) => {
    expect.assertions(3);
    const strFile = './includes/Readme.md';
    const strParam = '  test  ';
    const strTest = `[[include:${strFile}]](${strParam})`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const matches = strTest.match(proc.regexMain);
    if (matches) {
      expect(matches[proc.indexFile]).toBe(strFile);
      expect(matches[proc.indexOption]).toBeUndefined();
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match [[include:Readme.md]](asJsString)', (done) => {
    expect.assertions(3);
    const strFile = 'Readme.md';
    const strParam = 'asJsString';
    const strTest = `[[include:${strFile}]](${strParam})`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const matches = strTest.match(proc.regexMain);
    if (matches) {
      expect(matches[proc.indexFile]).toBe(strFile);
      expect(matches[proc.indexOption]).toBe(strParam);
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match [[include:Readme.md]](asJsString••)', (done) => {
    expect.assertions(3);
    const strFile = 'Readme.md';
    const strParam = 'asJsString  ';
    const strTest = `[[include:${strFile}]](${strParam})`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const matches = strTest.match(proc.regexMain);
    if (matches) {
      expect(matches[proc.indexFile]).toBe(strFile);
      expect(matches[proc.indexOption]).toBe(strParam);
    }
    done();
  });
});

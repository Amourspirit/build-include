import { MatchBuildIncludeSlash } from "../MatchBuildIncludeSlash";
import { MatchOptionsProcess } from "../../process/MatchOptionsProcess";
const inst = new MatchBuildIncludeSlash();
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
    expect(inst.options).toBe('i');
    done();
  });

  test('kind', (done) => {
    expect.assertions(1);
    expect(inst.kind).toBe('buildIncludeSlash');
    done();
  });

  test('name', (done) => {
    expect.assertions(1);
    expect(inst.name.toUpperCase()).toBe('BUILD_INCLUDE');
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
  test('MatchOptionsProcess.regexSimple match //•build_include', (done) => {
    expect.assertions(2);
    const strTest = '// build_include';
    expect(proc.regexSimple.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexSimple);
    if (m) {
      expect(m[0]).toBe(strTest);
    }
    done();
  });

  test('MatchOptionsProcess.regexSimple match //build_include', (done) => {
    expect.assertions(2);
    const strTest = '//build_include';
    expect(proc.regexSimple.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexSimple);
    if (m) {
      expect(m[0]).toBe(strTest);
    }
    done();
  });

  test('MatchOptionsProcess.regexSimple match //•bUILD_iNCLUDE', (done) => {
    expect.assertions(2);
    const strTest = '// bUILD_iNCLUDE';
    expect(proc.regexSimple.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexSimple);
    if (m) {
      expect(m[0]).toBe(strTest);
    }
    done();
  });

  test('MatchOptionsProcess.regexSimple match ••//•build_include', (done) => {
    expect.assertions(2);
    const strTest = '  // build_include';
    expect(proc.regexSimple.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexSimple);
    if (m) {
      expect(m[0]).toBe(strTest.trimLeft());
    }
    done();
  });

});

describe('MatchOptionsProcess.regexMain', () => {
  test('MatchOptionsProcess.regexMain match //build_include(Readme.md)', (done) => {
    expect.assertions(2);
    const strFile = 'Readme.md';
    const strTest = `//build_include(${strFile})`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match //•build_include(••Readme.md)', (done) => {
    expect.assertions(2);
    const strFile = '  Readme.md';
    const strTest = `// build_include(${strFile})`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile.trimLeft());
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match //•build_include(••../includes/Readme.md••)', (done) => {
    expect.assertions(2);
    const strFile = '  ../includes/Readme.md  ';
    const strTest = `// build_include(${strFile})`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile.trim());
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match //•build_include(••"••Readme.md••"••)', (done) => {
    expect.assertions(2);
    const strFile = 'Readme.md';
    const strTest = `// build_include(  "  ${strFile}  "  )`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match //•build_include("Readme.md")', (done) => {
    expect.assertions(2);
    const strFile = 'Readme.md';
    const strTest = `// build_include("${strFile}")`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
    }
    done();
  });

  test("MatchOptionsProcess.regexMain match //•build_include('Readme.md')", (done) => {
    expect.assertions(2);
    const strFile = 'Readme.md';
    const strTest = `// build_include('${strFile}')`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match //•build_include(<rootDir>Readme.md)', (done) => {
    expect.assertions(2);
    const strFile = '<rootDir>Readme.md';
    const strTest = `// build_include("${strFile}")`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match //•build_include(../includes/Readme.md)[test]', (done) => {
    expect.assertions(3);
    const strFile = '../includes/Readme.md';
    const strParam = 'test';
    const strTest = `// build_include('${strFile}')[${strParam}]`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
      expect(m[proc.indexOption]).toBe(strParam);
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match //•build_include(../includes/Readme.md)[••test••]', (done) => {
    expect.assertions(3);
    const strFile = '../includes/Readme.md';
    const strParam = '  test  ';
    const strTest = `// build_include('${strFile}')[${strParam}]`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
      expect(m[proc.indexOption]).toBe(strParam.trimLeft());
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match //•build_include(Readme.md)[text?before=\\[\\n&after=\\n\\]&PadRight=\\\\,breakstring?width=60]', (done) => {
    expect.assertions(3);
    const strFile = 'Readme.md';
    const strParam = '[text?before=\\[\\n&after=\\n\\]&PadRight=\\,breakstring?width=60]';
    const strTest = `// build_include('${strFile}')[${strParam}]`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
      expect(m[proc.indexOption]).toBe(strParam);
    }
    done();
  });

  test('MatchOptionsProcess.regexMain match //•build_include(Readme.md)\\n[text?before=\\[\\n&after=\\n\\]&PadRight=\\\\,breakstring?width=60]', (done) => {
    expect.assertions(3);
    const strFile = 'Readme.md';
    const strParam = '[text?before=\\[\\n&after=\\n\\]&PadRight=\\,breakstring?width=60]';
    const strTest = `// build_include('${strFile}')\n[${strParam}]`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
      expect(m[proc.indexOption]).toBe(strParam);
    }
    done();
  });


  test('MatchOptionsProcess.regexMain match //•build_include(Readme.md)\\r\\n[text?before=\\[\\n&after=\\n\\]&PadRight=\\\\,breakstring?width=60]', (done) => {
    expect.assertions(3);
    const strFile = 'Readme.md';
    const strParam = '[text?before=\\[\\n&after=\\n\\]&PadRight=\\,breakstring?width=60]';
    const strTest = `// build_include('${strFile}')\r\n[${strParam}]`;
    expect(proc.regexMain.test(strTest)).toBeTruthy();
    const m = strTest.match(proc.regexMain);
    if (m) {
      expect(m[proc.indexFile]).toBe(strFile);
      expect(m[proc.indexOption]).toBe(strParam);
    }
    done();
  });
});

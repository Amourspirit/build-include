import { LogSimple } from "../LogSimple";
import * as mockConsole from "jest-mock-console";

const prefix = '[Build-Include]: ';
const prefixWarning = 'Warning: ';
const logger = new LogSimple();
// mockConsole has an import bug. this is a workaround that get it working
// without breaking ide. 
// bug: https://github.com/bpedersen/jest-mock-console/issues/14
const mConsole: any = mockConsole;



describe("Test Verbose of LogSimple Console", () => {
  test('test mackConsole', (done) => {
    const restoreConsole = mConsole("error");
    // tslint:disable-next-line: no-console
    console.error('This will not show in the test report');
    // tslint:disable-next-line: no-console
    expect(console.error).toHaveBeenCalled();
    restoreConsole();
    done();

  });
  test('test mockConsole Log Test', (done) => {
    const restoreConsole = mConsole("log");
    // tslint:disable-next-line: no-console
    console.log('This should not display');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith('This should not display');
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    restoreConsole();
    done();
  });

  test('test basic writeln function', (done) => {
    logger.isVerbose = true;
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    // tslint:disable-next-line: no-console
    logger.writeln('This should not show');
    // tslint:disable-next-line: no-console
    const lg = console.log;
    expect(lg).toHaveBeenCalledWith(prefix, "This should not show");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');

    restoreConsole();
    done();
  });

  test('test basic writeln function empty line', (done) => {
    logger.isVerbose = true;
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    // tslint:disable-next-line: no-console
    logger.writeln('');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith(prefix, "");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');

    restoreConsole();
    done();
  });

  test('test basic writeln function empty', (done) => {
    logger.isVerbose = true;
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    // tslint:disable-next-line: no-console
    logger.writeln();
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith(prefix, "");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');

    restoreConsole();
    done();
  });
  test('test basic writeln function with format', (done) => {
    logger.isVerbose = true;
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    // tslint:disable-next-line: no-console
    logger.writeln('this %d', '1', 'test');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith(prefix, "this 1 test");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    restoreConsole();
    done();
  });

  test('test basic warn function', (done) => {
    logger.isVerbose = true;
    expect.assertions(2);
    const restoreConsole = mConsole("warn");
    // tslint:disable-next-line: no-console
    logger.warn('this %s', 'is', 'a warning');
    // tslint:disable-next-line: no-console
    expect(console.warn).toHaveBeenCalledWith(prefix, prefixWarning, "this is a warning");
    // tslint:disable-next-line: no-console
    expect(console.warn).not.toThrow();
    restoreConsole();
    done();
  });

  test('test basic error function', (done) => {
    logger.isVerbose = true;
    expect.assertions(2);
    const restoreConsole = mConsole("error");
    // tslint:disable-next-line: no-console
    logger.error("this is an error");
    // tslint:disable-next-line: no-console
    expect(console.error).toHaveBeenCalledWith(prefix, "this is an error");
    // tslint:disable-next-line: no-console
    expect(console.error).not.toThrow();
    restoreConsole();
    done();
  });
});

describe("Test Verbose OFF of LogSimple Console", () => {
  test('test basic writeln function', (done) => {
    logger.isVerbose = false;
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    // tslint:disable-next-line: no-console
    logger.writeln('This should not show');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledTimes(0);
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');

    restoreConsole();
    done();
  });

  test('test basic writeln function empty line', (done) => {
    logger.isVerbose = false;
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    // tslint:disable-next-line: no-console
    logger.writeln('');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledTimes(0);
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');

    restoreConsole();
    done();
  });

  test('test basic writeln function empty', (done) => {
    logger.isVerbose = false;
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    // tslint:disable-next-line: no-console
    logger.writeln();
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledTimes(0);
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');

    restoreConsole();
    done();
  });
  test('test basic writeln function with format', (done) => {
    logger.isVerbose = false;
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    // tslint:disable-next-line: no-console
    logger.writeln('this %d', '1', 'test');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledTimes(0);
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    restoreConsole();
    done();
  });

  test('test basic warn function', (done) => {
    logger.isVerbose = false;
    expect.assertions(2);
    const restoreConsole = mConsole("warn");
    // tslint:disable-next-line: no-console
    logger.warn('this %s', 'is', 'a warning');
    // tslint:disable-next-line: no-console
    expect(console.warn).toHaveBeenCalledTimes(0);
    // tslint:disable-next-line: no-console
    expect(console.warn).not.toThrow();
    restoreConsole();
    done();
  });

  test('test basic error function', (done) => {
    logger.isVerbose = false;
    expect.assertions(2);
    const restoreConsole = mConsole("error");
    // tslint:disable-next-line: no-console
    logger.error("this is an error");
    // tslint:disable-next-line: no-console
    expect(console.error).toHaveBeenCalledTimes(0);
    // tslint:disable-next-line: no-console
    expect(console.error).not.toThrow();
    restoreConsole();
    done();
  });
});

import { LogSimple } from "../LogSimple";
import * as mockConsole from "jest-mock-console";
import { EventArgs } from "../../event/EventArgs";
import { MsgEventArgs } from "../../event/MsgEventArg";
import { CancelEventArgs } from "../../event/CancelEventArgs";
const prefix = '[Build-Include]:';
const prefixWarning = 'Warning:';
let logger = new LogSimple();
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
    logger = new LogSimple();
    logger.isVerbose = true;
    expect.assertions(1);
    const tstMsg = 'This should not show';
    let msg = '';
    const onMsg = (e: MsgEventArgs) => {
      msg = e.message;
    }
    logger.addHandlerAfterWriteln(onMsg);
    logger.writeln(tstMsg);
    const newMsg = prefix + ' ' + tstMsg;
    expect(msg).toBe(newMsg);
    done();
  });

  test('test basic writeln function empty line', (done) => {
    logger = new LogSimple();
    logger.isVerbose = true;
    expect.assertions(1);
    let fired = false;
    // tslint:disable-next-line: variable-name
    const onEmpty = (_e: EventArgs) => {
      fired = true;
    }
    logger.addHandlerAfterEmptyln(onEmpty);
    logger.emptyln();
    expect(fired).toBeTruthy();
    done();
  });

  test('test basic writeln function empty', (done) => {
    logger = new LogSimple();
    logger.isVerbose = true;
    expect.assertions(1);
    const tstMsg = '';
    let msg = '';
    const onMsg = (e: MsgEventArgs) => {
      msg = e.message;
    }
    logger.addHandlerAfterWriteln(onMsg);
    logger.writeln(tstMsg);
    const newMsg = prefix;
    expect(msg).toBe(newMsg);
    done();
  });
  test('test basic writeln function with format', (done) => {
    logger = new LogSimple();
    logger.isVerbose = true;
    expect.assertions(1);
    let msg = '';
    const onMsg = (e: MsgEventArgs) => {
      msg = e.message;
    }
    logger.addHandlerAfterWriteln(onMsg);
    logger.writeln('this %d', '1', 'test');
    const newMsg = prefix + ' this 1 test';
    expect(msg).toBe(newMsg);
    done();
  });

  test('test basic warn function', (done) => {
    logger = new LogSimple();
    logger.isVerbose = true;
    expect.assertions(1);
    let msg = '';
    const onMsg = (e: MsgEventArgs) => {
      msg = e.message;
    }
    logger.addHandlerAfterWarn(onMsg);
    logger.warn('this %s', 'is', 'a warning');
    const newMsg = prefix + ' ' + prefixWarning + ' this is a warning';
    expect(msg).toBe(newMsg);
    done();
  });

  test('test basic error function', (done) => {
    logger = new LogSimple();
    logger.isVerbose = true;
    expect.assertions(1);
    const tstMsg = 'this is an error';
    let msg = '';
    const onMsg = (e: MsgEventArgs) => {
      msg = e.message;
    }
    logger.addHandlerAfterError(onMsg);
    logger.error(tstMsg);
    const newMsg = prefix + ' ' + tstMsg;
    expect(msg).toBe(newMsg);
    done();
  });

  test('test basic error function with modified msg', (done) => {
    logger = new LogSimple();
    logger.isVerbose = true;
    expect.assertions(1);
    const tstMsg = 'this is an error';
    let msg = '';
    const onMsg = (e: MsgEventArgs) => {
      e.message += ' Got IT!';
    }
    const onMsgAfter = (e: MsgEventArgs) => {
      msg = e.message;
    }
    logger.addHandlerBeforeError(onMsg);
    logger.addHandlerAfterError(onMsgAfter);
    logger.error(tstMsg);
    const newMsg = prefix + ' ' + tstMsg + ' Got IT!';
    expect(msg).toBe(newMsg);
    done();
  });

  test('test basic write function trigger cancel of event', (done) => {
    logger = new LogSimple();
    logger.isVerbose = true;
    expect.assertions(1);
    const tstMsg = 'this is an error';
    let afterFired = false;
    const onMsg = (e: MsgEventArgs) => {
      e.cancel = true;
    }
    const onMsgAfter = (e: MsgEventArgs) => {
      afterFired = !e.cancel;
    }
    logger.addHandlerBeforeWriteln(onMsg);
    logger.addHandlerAfterWriteln(onMsgAfter);
    logger.writeln(tstMsg);
    expect(afterFired).toBeFalsy();
    done();
  });
});

describe("Test Verbose OFF of LogSimple Console", () => {
  test('test basic writeln function', (done) => {
    logger = new LogSimple();
    logger.isVerbose = false;
    expect.assertions(1);
    let fired = false;
    const onMsg = (e: MsgEventArgs) => {
      fired = !e.cancel;
    }
    logger.addHandlerBeforeWriteln(onMsg);
    logger.addHandlerAfterWriteln(onMsg);
    logger.writeln('any msg');
    expect(fired).toBeFalsy();
    done();
  });

  test('test basic writeln function empty line', (done) => {
    logger = new LogSimple();
    logger.isVerbose = false;
    expect.assertions(1);
    let fired = false;
    // tslint:disable-next-line: variable-name
    const onEmpty = (_e: EventArgs) => {
      fired = true;
    
    }
    logger.addHandlerBeforeEmptyln(onEmpty);
    logger.addHandlerAfterEmptyln(onEmpty);
    logger.emptyln();
    expect(fired).toBeFalsy();
    done();
  });

  test('test basic warn function', (done) => {
    logger = new LogSimple();
    logger.isVerbose = false;
    expect.assertions(1);
    let fired = false;
    const onMsg = (e: MsgEventArgs) => {
      fired = !e.cancel;
    
    }
    logger.addHandlerBeforeWarn(onMsg);
    logger.addHandlerAfterWarn(onMsg);
    logger.warn('any msg');
    expect(fired).toBeFalsy();
    done();
  });

  test('test basic error function', (done) => {
    logger = new LogSimple();
    logger.isVerbose = false;
    expect.assertions(1);
    let fired = false;
    const onMsg = (e: MsgEventArgs) => {
      fired = !e.cancel;
    }
    logger.addHandlerBeforeError(onMsg);
    logger.addHandlerAfterError(onMsg);
    logger.error('any msg');
    expect(fired).toBeFalsy();
    done();
  });
});

describe('It should remove Event Handlers', () => {
  it('should add and remove event handler for emptyln', (done) => {
    expect.assertions(2);
    logger = new LogSimple();
    logger.isVerbose = true;
    let eventFired = false;
    const handler = (e: CancelEventArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeEmptyln(handler);
    logger.emptyln();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    logger.removeHandlerBeforeEmptyln(handler);
    logger.emptyln();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for error', (done) => {
    expect.assertions(2);
    logger = new LogSimple();
    logger.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeError(handler);
    logger.error();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    logger.removeHandlerBeforeError(handler);
    logger.error();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for emptyln', (done) => {
    expect.assertions(2);
    logger = new LogSimple();
    logger.isVerbose = true;
    let eventFired = false;
    const handler = (e: CancelEventArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeEmptyln(handler);
    logger.emptyln();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    logger.removeHandlerBeforeEmptyln(handler);
    logger.emptyln();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for warn', (done) => {
    expect.assertions(2);
    logger = new LogSimple();
    logger.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeWarn(handler);
    logger.warn();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    logger.removeHandlerBeforeWarn(handler);
    logger.warn();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for write', (done) => {
    expect.assertions(2);
    logger = new LogSimple();
    logger.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeWrite(handler);
    logger.write();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    logger.removeHandlerBeforeWrite(handler);
    logger.write();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for writeln', (done) => {
    expect.assertions(2);
    logger = new LogSimple();
    logger.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeWriteln(handler);
    logger.writeln();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    logger.removeHandlerBeforeWriteln(handler);
    logger.writeln();
    expect(eventFired).toBeFalsy();
    done();
  });

});

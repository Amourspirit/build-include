import { LogEvent } from "../LogEvent";
import { MsgEventAnyArgs } from "../../event/MsgEventAnyArgs";
import { CancelEventArgs } from "../../event/CancelEventArgs";
import { assert } from "console";

const log = new LogEvent();

describe("Test Event driven log in non verbose mode", () => {
  it('should not fire callback', (done) => {
    expect.assertions(1);
    log.isVerbose = false;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeWriteln(handler);
    log.writeln('test');
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should fire not callback', (done) => {
    expect.assertions(1);
    log.isVerbose = false;
    let theArgs: any[] = [];
    const handler = (e: MsgEventAnyArgs) => {
      theArgs = e.args;
    };
    log.addHandlerBeforeError(handler);
    log.error('test', 'hello');
    expect(theArgs.length).toEqual(0);
    done();
  });

  it('should fire not callback', (done) => {
    expect.assertions(1);
    log.isVerbose = false;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeError(handler);
    log.error();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should not call error callback', (done) => {
    expect.assertions(1);
    log.isVerbose = false;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    log.addHandlerBeforeError(handler);
    log.error('test', 'hello');
    expect(result).toBe('');
    done();
  });

  it('should not call warn callback', (done) => {
    expect.assertions(1);
    log.isVerbose = false;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    log.addHandlerBeforeWarn(handler);
    log.warn('test', 'hello');
    expect(result).toBe('');
    done();
  });

  it('should not call write callback', (done) => {
    expect.assertions(1);
    log.isVerbose = false;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    log.addHandlerBeforeWrite(handler);
    log.write('test', 'hello');
    expect(result).toBe('');
    done();
  });

  it('should not call writeln callback', (done) => {
    expect.assertions(1);
    log.isVerbose = false;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    log.addHandlerBeforeWriteln(handler);
    log.writeln('test', 'hello');
    expect(result).toBe('');
    done();
  });

  it('should not call writeln callback', (done) => {
    expect.assertions(1);
    log.isVerbose = false;
    let eventFired = false;
    const handler = (e: CancelEventArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeEmptyln(handler);
    log.emptyln();
    expect(eventFired).toBeFalsy();
    done();
  });
});


describe("Test Event driven log in verbose mode", () => {
  it('should fire callback', (done) => {
    expect.assertions(1);
    log.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeWriteln(handler);
    log.writeln('test');
    expect(eventFired).toBeTruthy();
    done();
  });

  it('should fire callback with two args', (done) => {
    expect.assertions(1);
    log.isVerbose = true;
    let theArgs: any[] = [];
    const handler = (e: MsgEventAnyArgs) => {
      theArgs = e.args;
    };
    log.addHandlerBeforeError(handler);
    log.error('test', 'hello');
    expect(theArgs.length).toEqual(2);
    done();
  });

  it('should fire callback with zero args', (done) => {
    expect.assertions(1);
    log.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeError(handler);
    log.error();
    expect(eventFired).toBeTruthy();
    done();
  });

  it('should test error callback', (done) => {
    expect.assertions(1);
    log.isVerbose = true;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    log.addHandlerBeforeError(handler);
    log.error('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test warn callback', (done) => {
    expect.assertions(1);
    log.isVerbose = true;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    log.addHandlerBeforeWarn(handler);
    log.warn('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test write callback', (done) => {
    expect.assertions(1);
    log.isVerbose = true;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    log.addHandlerBeforeWrite(handler);
    log.write('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test writeln callback', (done) => {
    expect.assertions(1);
    log.isVerbose = true;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    log.addHandlerBeforeWriteln(handler);
    log.writeln('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test writeln callback', (done) => {
    expect.assertions(1);
    log.isVerbose = true;
    let eventFired = false;
    const handler = (e: CancelEventArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeEmptyln(handler);
    log.emptyln();
    expect(eventFired).toBeTruthy();
    done();
  });
});

describe('It should remove Event Handlers', () => {
  it('should add and remove event handler for emptyln', (done) => {
    expect.assertions(2);
    log.isVerbose = true;
    let eventFired = false;
    const handler = (e: CancelEventArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeEmptyln(handler);
    log.emptyln();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    log.removeHandlerBeforeEmptyln(handler);
    log.emptyln();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for error', (done) => {
    expect.assertions(2);
    log.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeError(handler);
    log.error();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    log.removeHandlerBeforeError(handler);
    log.error();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for emptyln', (done) => {
    expect.assertions(2);
    log.isVerbose = true;
    let eventFired = false;
    const handler = (e: CancelEventArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeEmptyln(handler);
    log.emptyln();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    log.removeHandlerBeforeEmptyln(handler);
    log.emptyln();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for warn', (done) => {
    expect.assertions(2);
    log.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeWarn(handler);
    log.warn();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    log.removeHandlerBeforeWarn(handler);
    log.warn();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for write', (done) => {
    expect.assertions(2);
    log.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeWrite(handler);
    log.write();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    log.removeHandlerBeforeWrite(handler);
    log.write();
    expect(eventFired).toBeFalsy();
    done();
  });

  it('should add and remove event handler for writeln', (done) => {
    expect.assertions(2);
    log.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    log.addHandlerBeforeWriteln(handler);
    log.writeln();
    expect(eventFired).toBeTruthy();
    eventFired = false;
    log.removeHandlerBeforeWriteln(handler);
    log.writeln();
    expect(eventFired).toBeFalsy();
    done();
  });

});
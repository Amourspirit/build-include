import { LoggerEvent } from "../LoggerEvent";
import { MsgEventAnyArgs } from "../../event/MsgEventAnyArgs";
import { CancelEventArgs } from "../../event/CancelEventArgs";
const logger = new LoggerEvent();

describe("Test Event driven logger in non verbose mode", () => { 
  it('should fire callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = false;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeWriteln(handler);
    logger.log.writeln('test');
    expect(eventFired).toBeTruthy();
    done();
  });

  it('should fire callback with two args', (done) => {
    expect.assertions(1);
    logger.isVerbose = false;
    let theArgs: any[] = [];
    const handler = (e: MsgEventAnyArgs) => {
      theArgs = e.args;
    };
    logger.addHandlerBeforeError(handler);
    logger.log.error('test', 'hello');
    expect(theArgs.length).toEqual(2);
    done();
  });

  it('should fire callback with zero args', (done) => {
    expect.assertions(1);
    logger.isVerbose = false;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeError(handler);
    logger.log.error();
    expect(eventFired).toBeTruthy();
    done();
  });

  it('should test error callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = false;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    logger.addHandlerBeforeError(handler);
    logger.log.error('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test warn callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = false;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    logger.addHandlerBeforeWarn(handler);
    logger.log.warn('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test write callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = false;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    logger.addHandlerBeforeWrite(handler);
    logger.log.write('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test writeln callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = false;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    logger.addHandlerBeforeWriteln(handler);
    logger.log.writeln('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test writeln callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = false;
    let eventFired = false;
    // tslint:disable-next-line: variable-name
    const handler = (e:CancelEventArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeEmptyln(handler);
    logger.log.emptyln();
    expect(eventFired).toBeTruthy();
    done();
  });

  it('should test emptyln callback and ignore verbose callback', (done) => {
    expect.assertions(2);
    logger.isVerbose = false;
    let eventFiredNormal = false;
    let eventFiredVerbose = false;
    const handler = (e: CancelEventArgs) => {
      eventFiredNormal = !e.cancel;
    };
    const handlerVerbose = (e: CancelEventArgs) => {
      eventFiredVerbose = !e.cancel;
    };
    logger.addHandlerBeforeEmptyln(handler);
    logger.addHandlerBeforeEmptylnVerbose(handlerVerbose);
    logger.log.emptyln();
    logger.verbose.emptyln();
    expect(eventFiredNormal).toBeTruthy();
    expect(eventFiredVerbose).toBeFalsy();
    done();
  });
});

describe("Test Event driven log in verbose mode", () => {
  it('should fire callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeWritelnVerbose(handler);
    logger.verbose.writeln('test');
    expect(eventFired).toBeTruthy();
    done();
  });

  it('should fire callback with two args', (done) => {
    expect.assertions(1);
    logger.isVerbose = true;
    let theArgs: any[] = [];
    const handler = (e: MsgEventAnyArgs) => {
      theArgs = e.args;
    };
    logger.addHandlerAfterErrorVerbose(handler);
    logger.verbose.error('test', 'hello');
    expect(theArgs.length).toEqual(2);
    done();
  });

  it('should fire callback with zero args', (done) => {
    expect.assertions(1);
    logger.isVerbose = true;
    let eventFired = false;
    const handler = (e: MsgEventAnyArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerAfterErrorVerbose(handler);
    logger.verbose.error();
    expect(eventFired).toBeTruthy();
    done();
  });

  it('should test error callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = true;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    logger.addHandlerBeforeErrorVerbose(handler);
    logger.verbose.error('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test warn callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = true;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    logger.addHandlerBeforeWarnVerbose(handler);
    logger.verbose.warn('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test write callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = true;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    logger.addHandlerBeforeWriteVerbose(handler);
    logger.verbose.write('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test writeln callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = true;
    let result = '';
    const handler = (e: MsgEventAnyArgs) => {
      result = e.args.join(' ');
    };
    logger.addHandlerBeforeWritelnVerbose(handler);
    logger.verbose.writeln('test', 'hello');
    expect(result).toBe('test hello');
    done();
  });

  it('should test writeln callback', (done) => {
    expect.assertions(1);
    logger.isVerbose = true;
    let eventFired = false;
    const handler = (e: CancelEventArgs) => {
      eventFired = !e.cancel;
    };
    logger.addHandlerBeforeEmptylnVerbose(handler);
    logger.verbose.emptyln();
    expect(eventFired).toBeTruthy();
    done();
  });

  it('should test emptyln verbose callback and normal callback', (done) => {
    expect.assertions(2);
    logger.isVerbose = true;
    let eventFiredNormal = false;
    let eventFiredVerbose = false;
    const handler = (e: CancelEventArgs) => {
      eventFiredNormal = !e.cancel;
    };
    const handlerVerbose = (e: CancelEventArgs) => {
      eventFiredVerbose = !e.cancel;
    };
    logger.addHandlerBeforeEmptyln(handler);
    logger.addHandlerBeforeEmptylnVerbose(handlerVerbose);
    logger.log.emptyln();
    logger.verbose.emptyln();
    expect(eventFiredNormal).toBeTruthy();
    expect(eventFiredVerbose).toBeTruthy();
    done();
  });
});
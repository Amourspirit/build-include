import { ILogger, ILog } from "../src/interface/projectInterfaces";
import FLog = require("fancy-log");
import util = require("util");
import { EOL } from 'os';
import { MsgEventArgs } from "../src/event/MsgEventArg";
import { EventArgs } from "../src/event/EventArgs";
import { CancelEventArgs } from "../src/event/CancelEventArgs";
import { LogEvent } from "../src/log/LogEvent";
import { MsgEventAnyArgs } from "../src/event/MsgEventAnyArgs";
class FancyLog extends LogEvent {
  public preFix = '[Build-Include]:';
  constructor() {
    super();
  }
  public error(...args: any[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventAnyArgs();
      mArgs.message = this.preFix + ' ' + this.foramted(...args);
      mArgs.message = mArgs.message.trim();
      mArgs.args = args;
      this.onBeforeError(mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      FLog.error(mArgs.message);
      this.onAfterError(mArgs);
    }
  }
  public write(...args: string[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventAnyArgs();
      mArgs.message = this.foramted(...args);
      mArgs.args = args;
      this.onBeforeWrite(mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      process.stdout.write(mArgs.message);
      this.onAfterWrite(mArgs);
    }
  }
  public writeln(...args: any[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventAnyArgs();
      mArgs.message = this.preFix + ' ' + this.foramted(...args);
      mArgs.message = mArgs.message.trim();
      mArgs.args = args;
      this.onBeforeWriteln(mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      FLog(mArgs.message);
      this.onAfterWriteln(mArgs);
    }
  }
  public warn(...args: any[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventAnyArgs();
      mArgs.message = this.preFix + ' Warning: ' + this.foramted(...args);
      mArgs.message = mArgs.message.trim();
      mArgs.args = args;
      this.onBeforeWarn(mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      FLog.warn(mArgs.message);
      this.onAfterWarn(mArgs);
    }
  }
  public emptyln(): void {
    if (this.isVerbose === true) {
      const cArgs = new CancelEventArgs();
      this.onBeforeEmptyln(cArgs);
      if (cArgs.cancel === true) {
        return;
      }
      process.stdout.write(EOL);
      this.onAfterEmptyln(EventArgs.Empty);
    }
  }

  private foramted(...args: any[]): string {
    if (args.length === 0) {
      return '';
    }
    if (args.length === 1) {
      return new String(args[0]).toString();
    }
    // const arr = { ...args };
    const first: any = args.shift();
    return util.format(first, ...args);
  }
}

export class FancyLogger implements ILogger {
  private static LAST_LINE: string = '';
  constructor() {
    this.isVerbose = false;
    this.log.isVerbose = true;

    this.log.addHandlerBeforeError(this.onError);
    this.verbose.addHandlerBeforeError(this.onError);
    this.log.addHandlerBeforeWrite(this.onWrite);
    this.verbose.addHandlerBeforeWrite(this.onWrite);
    this.log.addHandlerBeforeWriteln(this.onWriteln);
    this.verbose.addHandlerBeforeWriteln(this.onWriteln);
    this.log.addHandlerBeforeWarn(this.onWarn);
    this.verbose.addHandlerBeforeWarn(this.onWarn);
    this.log.addHandlerBeforeEmptyln(this.onEmptyln);
    this.verbose.addHandlerBeforeEmptyln(this.onEmptyln);
  }
  log: FancyLog = new FancyLog();
  verbose: FancyLog = new FancyLog();

  /**
   * Gets if the verbose logger is logging,
   * If true verbose logger will log: Otherwise,
   * verbose logger will not log
   */
  public get isVerbose() {
    return this.verbose.isVerbose;
  }
  /**
  * Sets if the verbose logger is logging,
  * If true verbose logger will log: Otherwise,
  * verbose logger will not log
  */
  public set isVerbose(verbose: boolean) {
    this.verbose.isVerbose = verbose;
  }

  private onError(args: MsgEventArgs) {
    if (FancyLogger.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    FancyLogger.LAST_LINE = args.message;
  }
  private onWrite(args: MsgEventArgs) {
    FancyLogger.LAST_LINE = args.message;
  }
  private onWriteln(args: MsgEventArgs) {
    if (FancyLogger.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    FancyLogger.LAST_LINE = args.message;
  }
  private onWarn(args: MsgEventArgs) {
    if (FancyLogger.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    FancyLogger.LAST_LINE = args.message;
  }
  private onEmptyln(args: CancelEventArgs) {
    FancyLogger.LAST_LINE = EOL;
  }

  //#region Event Handlers
  //#region Add Event Handlers
  public addHandlerBeforeError(callback: (e: MsgEventAnyArgs) => void) {
    this.log.addHandlerBeforeWarn(callback);
  }
  public addHandlerAfterError(callback: (e: MsgEventAnyArgs) => void) {
    this.log.addHandlerAfterError(callback);
  }
  public addHandlerBeforeWrite(callback: (e: MsgEventAnyArgs) => void) {
    this.log.addHandlerBeforeWrite(callback);
  }
  public addHandlerAfterWrite(callback: (e: MsgEventAnyArgs) => void) {
    this.log.addHandlerAfterWrite(callback);
  }
  public addHandlerBeforeWriteln(callback: (e: MsgEventAnyArgs) => void) {
    this.log.addHandlerBeforeWriteln(callback);
  }
  public addHandlerAfterWriteln(callback: (e: MsgEventAnyArgs) => void) {
    this.log.addHandlerAfterWriteln(callback);
  }
  public addHandlerBeforeWarn(callback: (e: MsgEventAnyArgs) => void) {
    this.log.addHandlerBeforeWarn(callback);
  }
  public addHandlerAfterWarn(callback: (e: MsgEventAnyArgs) => void) {
    this.log.addHandlerAfterWarn(callback);
  }
  public addHandlerBeforeEmptyln(callback: (e: CancelEventArgs) => void) {
    this.log.addHandlerBeforeEmptyln(callback);
  }
  public addHandlerAfterEmptyln(callback: (e: EventArgs) => void) {
    this.log.addHandlerAfterEmptyln(callback);
  }
  //#endregion Add Event Handlers

  //#region Remove Event Handlers
  public removeHandlerBeforeError(callback: (e: MsgEventAnyArgs) => void) {
    this.log.removeHandlerBeforeError(callback);
  }
  public removeHandlerAfterError(callback: (e: MsgEventAnyArgs) => void) {
    this.log.removeHandlerAfterError(callback);

  }
  public removeHandlerBeforeWrite(callback: (e: MsgEventAnyArgs) => void) {
    this.log.removeHandlerBeforeWrite(callback);
  }
  public removeHandlerAfterWrite(callback: (e: MsgEventAnyArgs) => void) {
    this.log.removeHandlerAfterWrite(callback);
  }
  public removeHandlerBeforeWriteln(callback: (e: MsgEventAnyArgs) => void) {
    this.log.removeHandlerBeforeWriteln(callback);
  }
  public removeHandlerAfterWriteln(callback: (e: MsgEventAnyArgs) => void) {
    this.log.removeHandlerAfterWriteln(callback);
  }
  public removeHandlerBeforeWarn(callback: (e: MsgEventAnyArgs) => void) {
    this.log.removeHandlerBeforeWarn(callback);
  }
  public removeHandlerAfterWarn(callback: (e: MsgEventAnyArgs) => void) {
    this.log.removeHandlerAfterWarn(callback);
  }
  public removeHandlerBeforeEmptyln(callback: (e: CancelEventArgs) => void) {
    this.log.removeHandlerBeforeEmptyln(callback);
  }
  public removeHandlerAfterEmptyln(callback: (e: EventArgs) => void) {
    this.log.removeHandlerAfterEmptyln(callback);
  }
  //#endregion Remove Event Handlers

  //#region Add Verbose Event Handlers
  public addHandlerBeforeErrorVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.addHandlerBeforeWarn(callback);
  }
  public addHandlerAfterErrorVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.addHandlerAfterError(callback);
  }
  public addHandlerBeforeWriteVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.addHandlerBeforeWrite(callback);
  }
  public addHandlerAfterWriteVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.addHandlerAfterWrite(callback);
  }
  public addHandlerBeforeWritelnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.addHandlerBeforeWriteln(callback);
  }
  public addHandlerAfterWritelnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.addHandlerAfterWriteln(callback);
  }
  public addHandlerBeforeWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.addHandlerBeforeWarn(callback);
  }
  public addHandlerAfterWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.addHandlerAfterWarn(callback);
  }
  public addHandlerBeforeEmptylnVerbose(callback: (e: CancelEventArgs) => void) {
    this.verbose.addHandlerBeforeEmptyln(callback);
  }
  public addHandlerAfterEmptylnVerbose(callback: (e: EventArgs) => void) {
    this.verbose.addHandlerAfterEmptyln(callback);
  }
  //#endregion Add Verbose Event Handlers

  //#region Remove Verbose Event Handlers
  public removeHandlerBeforeErrorVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.removeHandlerBeforeError(callback);
  }
  public removeHandlerAfterErrorVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.removeHandlerAfterError(callback);

  }
  public removeHandlerBeforeWriteVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.removeHandlerBeforeWrite(callback);
  }
  public removeHandlerAfterWriteVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.removeHandlerAfterWrite(callback);
  }
  public removeHandlerBeforeWritelnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.removeHandlerBeforeWriteln(callback);
  }
  public removeHandlerAfterWritelnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.removeHandlerAfterWriteln(callback);
  }
  public removeHandlerBeforeWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.removeHandlerBeforeWarn(callback);
  }
  public removeHandlerAfterWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.verbose.removeHandlerAfterWarn(callback);
  }
  public removeHandlerBeforeEmptylnVerbose(callback: (e: CancelEventArgs) => void) {
    this.verbose.removeHandlerBeforeEmptyln(callback);
  }
  public removeHandlerAfterEmptylnVerbose(callback: (e: EventArgs) => void) {
    this.verbose.removeHandlerAfterEmptyln(callback);
  }
  //#endregion Remove Verbose Event Handlers

	//#endregion Event Handlers
  
}
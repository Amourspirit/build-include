import { ILogger, ILog } from "../src/interface/projectInterfaces";
import FLog = require("fancy-log");
import util = require("util");
import { EOL } from 'os';
import { Events } from "../src/event/Events";
import { MsgEventArgs } from "../src/event/MsgEventArg";
import { EventArgs } from "../src/event/EventArgs";
import { CancelEventArgs } from "../src/event/CancelEventArgs";
class FancyLog implements ILog {
  public isVerbose: boolean = false;
  public preFix = '[Build-Include]:';
  public events: Events;
  constructor() {
    this.events = new Events();
  }
  public error(...args: any[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventArgs();
      mArgs.message = this.preFix + ' ' + this.foramted(...args);
      mArgs.message = mArgs.message.trim();
      this.events.trigger('beforeError', mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      FLog.error(mArgs.message);
      this.events.trigger('afterError', mArgs);
    }
  }
  public write(...args: string[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventArgs();
      mArgs.message = this.foramted(...args);
      this.events.trigger('beforeWrite', mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      process.stdout.write(mArgs.message);
      this.events.trigger('afterWrite', mArgs);
    }
  }
  public writeln(...args: any[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventArgs();
      mArgs.message = this.preFix + ' ' + this.foramted(...args);
      mArgs.message = mArgs.message.trim();
      this.events.trigger('beforeWriteln', mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      FLog(mArgs.message);
      this.events.trigger('afterWriteln', mArgs);
    }
  }
  public warn(...args: any[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventArgs();
      mArgs.message = this.preFix + ' ' + this.foramted(...args);
      mArgs.message = mArgs.message.trim();
      this.events.trigger('beforeWarn', mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      FLog.warn(mArgs.message);
      this.events.trigger('afterWarn', mArgs);
    }
  }
  public emptyln(): void {
    if (this.isVerbose === true) {
      const cArgs = new CancelEventArgs();
      this.events.trigger('beforeEmptyln', cArgs);
      if (cArgs.cancel === true) {
        return;
      }
      process.stdout.write(EOL);
      this.events.trigger('afterEmptyln', EventArgs.Empty);
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
    this.log.events.on('beforeError', this.onError);
    this.verbose.events.on('beforeError', this.onError);
    this.log.events.on('beforeWrite', this.onWrite);
    this.verbose.events.on('beforeWrite', this.onWrite);
    this.log.events.on('beforeWriteln', this.onWriteln);
    this.verbose.events.on('beforeWriteln', this.onWriteln);
    this.log.events.on('beforeWarn', this.onWarn);
    this.verbose.events.on('beforeWarn', this.onWarn);
    this.log.events.on('beforeEmptyln', this.onEmptyln);
    this.verbose.events.on('beforeEmptyln', this.onEmptyln);
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
}
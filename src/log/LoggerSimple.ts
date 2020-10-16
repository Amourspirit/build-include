import { ILogger } from "../interface/projectInterfaces";
import { LogSimple } from "./LogSimple";
import { CancelEventArgs } from "../event/CancelEventArgs";
import { MsgEventArgs } from "../event/MsgEventArg";
import { EOL } from "os";

/**
 * Logger that logs to the Console.
 * If Verbose [[isVerbose]] is true then verbose logging will take place as well.
 */
export class LoggerSimple implements ILogger {
  private static LAST_LINE:string = '';
  /**
   * Creates a new instance of class
   */
  constructor() {
    this.log = new LogSimple();
    this.verbose = new LogSimple();
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
  /**
   * Logger that does the general logging
   */
  log: LogSimple;
  /**
   * Logger that does the verbose logging
   */
  verbose: LogSimple;

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

  private onError(e: MsgEventArgs) {
    if (LoggerSimple.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    LoggerSimple.LAST_LINE = e.message;
  }
  private onWrite(e: MsgEventArgs) {
    LoggerSimple.LAST_LINE = e.message;
  }
  private onWriteln(e: MsgEventArgs) {
    if (LoggerSimple.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    LoggerSimple.LAST_LINE = e.message;
  }
  private onWarn(e: MsgEventArgs) {
    if (LoggerSimple.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    LoggerSimple.LAST_LINE = e.message;
  }
  // tslint:disable-next-line: variable-name
  private onEmptyln(_e: CancelEventArgs) {
    LoggerSimple.LAST_LINE = EOL;
  }
}
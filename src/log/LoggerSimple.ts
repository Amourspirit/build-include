import { ILogger } from "../interface/projectInterfaces";
import { LogSimple } from "./LogSimple";

/**
 * Logger that logs to the Console.
 * If Verbose [[isVerbose]] is true then verbose logging will take place as well.
 */
export class LoggerSimple implements ILogger {

  /**
   * Creates a new instance of class
   */
  constructor() {
    this.log = new LogSimple();
    this.verbose = new LogSimple();
    this.isVerbose = false;
    this.log.isVerbose = true;
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
}
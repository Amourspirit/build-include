import { ILogger } from "../interface/projectInterfaces";
import { LogNull } from "./LogNull";

/**
 * Class that intentionally logs nothing. This is the logger used in
 * [[BuildProcess]] if no other logger is passed into the constructor.
 */
export class LoggerNull implements ILogger {

  /**
   * Creates a new instance of the class.
   */
  constructor() {
    this.log = new LogNull();
    this.verbose = new LogNull();
    this.isVerbose = false;
    this.log.isVerbose = true;
  }
  log: LogNull;
  verbose: LogNull;

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
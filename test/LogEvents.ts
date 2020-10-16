import { LoggerEvent } from "../src/log/LoggerEvent";
import { MsgEventAnyArgs } from "../src/event/MsgEventAnyArgs";
import { CancelEventArgs } from "../src/event/CancelEventArgs";
import * as util from 'util';
import { EOL } from 'os';
import * as chalk from "chalk";
export class LogEvents {
  public logger: LoggerEvent;
  public static PREFIX: string = '[Build-Include:]';
  private static LAST_LINE: string = '';
  constructor(logger: LoggerEvent) {
    this.logger = logger;
    this.logger.addHandlerBeforeError(this.logError);
    this.logger.addHandlerBeforeErrorVerbose(this.logError);
    this.logger.addHandlerBeforeWarn(this.logWarn);
    this.logger.addHandlerBeforeWarnVerbose(this.logWarn);
    this.logger.addHandlerBeforeWriteln(this.logSimple);
    this.logger.addHandlerBeforeWritelnVerbose(this.logSimple);
    this.logger.addHandlerBeforeWrite(this.logWrite);
    this.logger.addHandlerBeforeWriteVerbose(this.logWrite);
    this.logger.addHandlerBeforeEmptyln(this.logEmptyLn);
    this.logger.addHandlerBeforeEmptylnVerbose(this.logEmptyLn);
  }
  private logSimple(e: MsgEventAnyArgs) {
    if (LogEvents.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    LogEvents.LAST_LINE = LogEvents.PREFIX + ' ' + LogEvents.foramted(e.args);
    process.stdout.write(chalk.green(LogEvents.LAST_LINE.trim()));
    process.stdout.write(EOL);
  }

  private logWrite(e: MsgEventAnyArgs) {
    LogEvents.LAST_LINE = LogEvents.foramted(e.args);
    process.stdout.write(chalk.cyan(LogEvents.LAST_LINE));
  }

  private logWarn(e:MsgEventAnyArgs) {
    if (LogEvents.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    LogEvents.LAST_LINE = LogEvents.PREFIX + ' Warning: ' + LogEvents.foramted(e.args);
    process.stdout.write(chalk.yellow(LogEvents.LAST_LINE.trim()));
    process.stdout.write(EOL);
  }

  private logError(e: MsgEventAnyArgs) {
    if (LogEvents.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    LogEvents.LAST_LINE = LogEvents.PREFIX + ' Error: ' + LogEvents.foramted(e.args);
    process.stdout.write(chalk.red(LogEvents.LAST_LINE.trim()));
    process.stdout.write(EOL);
  }

  private logEmptyLn(_e: CancelEventArgs) {
    LogEvents.LAST_LINE = EOL;
    process.stdout.write(EOL);
  }

  private static foramted(...args: any[]): string {
    if (args.length === 0) {
      return '';
    }
    if (args.length === 1) {
      // tslint:disable-next-line: no-construct
      return new String(args[0]).toString();
    }
    // const arr = { ...args };
    const first: any = args.shift();
    return util.format(first, ...args);
  }
}
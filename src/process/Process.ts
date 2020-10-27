import { LoggerEvent } from "../log/LoggerEvent";
import { CancelEventArgs } from "../event/CancelEventArgs";
import { EventArgs } from "../event/EventArgs";
import { MsgEventAnyArgs } from "../event/MsgEventAnyArgs";
import { ILogEvents, ILogEventsVerbose, ILogger } from "../interface/projectInterfaces";

export class Process implements ILogEvents, ILogEventsVerbose {
  protected logger: LoggerEvent;
  constructor() {
    this.logger = new LoggerEvent();
  }

  //#region Handlers

  //#region Add Handlers

  //#region Handlers log
  public addHandlerBeforeEmptyln(callback: (e: CancelEventArgs) => void) {
    this.logger.addHandlerBeforeEmptyln(callback);
  }
  public addHandlerAfterEmptyln(callback: (e: EventArgs) => void) {
    this.logger.addHandlerAfterEmptyln(callback);
  }

  public addHandlerBeforeError(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerBeforeError(callback);
  }
  public addHandlerAfterError(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerAfterError(callback);
  }

  public addHandlerBeforeWrite(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerBeforeWrite(callback);
  }
  public addHandlerAfterWrite(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerAfterWrite(callback);
  }

  public addHandlerBeforeWriteln(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerBeforeWriteln(callback);
  }
  public addHandlerAfterWriteln(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerAfterWriteln(callback);
  }

  public addHandlerBeforeWarn(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerBeforeWarn(callback);
  }
  public addHandlerAfterWarn(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerAfterWarn(callback);
  }
  //#endregion Handlers Log

  //#region handlers Verbose
  public addHandlerBeforeEmptylnVerbose(callback: (e: CancelEventArgs) => void) {
    this.logger.addHandlerBeforeEmptylnVerbose(callback);
  }
  public addHandlerAfterEmptylnVerbose(callback: (e: EventArgs) => void) {
    this.logger.addHandlerAfterEmptylnVerbose(callback);
  }

  public addHandlerBeforeErrorVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerBeforeErrorVerbose(callback);
  }
  public addHandlerAfterErrorVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerAfterErrorVerbose(callback);
  }

  public addHandlerBeforeWriteVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerBeforeWriteVerbose(callback);
  }
  public addHandlerAfterWriteVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerAfterWriteVerbose(callback);
  }

  public addHandlerBeforeWritelnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerBeforeWritelnVerbose(callback);
  }
  public addHandlerAfterWritelnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerAfterWritelnVerbose(callback);
  }

  public addHandlerBeforeWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerBeforeWarnVerbose(callback);
  }
  public addHandlerAfterWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.addHandlerAfterWarnVerbose(callback);
  }
  //#endregion Handlers Verbose

  //#endregion Add Handlers

  //#region Remove Handlers

  //#region Handlers log
  public removeHandlerBeforeEmptyln(callback: (e: CancelEventArgs) => void) {
    this.logger.removeHandlerBeforeEmptyln(callback);
  }
  public removeHandlerAfterEmptyln(callback: (e: EventArgs) => void) {
    this.logger.removeHandlerAfterEmptyln(callback);
  }

  public removeHandlerBeforeError(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerBeforeError(callback);
  }
  public removeHandlerAfterError(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerAfterError(callback);
  }

  public removeHandlerBeforeWrite(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerBeforeWrite(callback);
  }
  public removeHandlerAfterWrite(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerAfterWrite(callback);
  }

  public removeHandlerBeforeWriteln(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerBeforeWriteln(callback);
  }
  public removeHandlerAfterWriteln(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerAfterWriteln(callback);
  }

  public removeHandlerBeforeWarn(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerBeforeWarn(callback);
  }
  public removeHandlerAfterWarn(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerAfterWarn(callback);
  }
  //#endregion Handlers Log

  //#region handlers Verbose
  public removeHandlerBeforeEmptylnVerbose(callback: (e: CancelEventArgs) => void) {
    this.logger.removeHandlerBeforeEmptylnVerbose(callback);
  }
  public removeHandlerAfterEmptylnVerbose(callback: (e: EventArgs) => void) {
    this.logger.removeHandlerAfterEmptylnVerbose(callback);
  }

  public removeHandlerBeforeErrorVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerBeforeErrorVerbose(callback);
  }
  public removeHandlerAfterErrorVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerAfterErrorVerbose(callback);
  }

  public removeHandlerBeforeWriteVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerBeforeWriteVerbose(callback);
  }
  public removeHandlerAfterWriteVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerAfterWriteVerbose(callback);
  }

  public removeHandlerBeforeWritelnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerBeforeWritelnVerbose(callback);
  }
  public removeHandlerAfterWritelnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerAfterWritelnVerbose(callback);
  }

  public removeHandlerBeforeWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerBeforeWarnVerbose(callback);
  }
  public removeHandlerAfterWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
    this.logger.removeHandlerAfterWarnVerbose(callback);
  }
  //#endregion Handlers Verbose

  //#endregion Remove Handlers

  //#region logger registration  
  private registrationHandler(loggerEvent: ILogger, remove = false) {
    //#region Internal Methods

    //#region log write methods
    // tslint:disable-next-line: variable-name
    const emptyln = (_e: CancelEventArgs) => {
      loggerEvent.log.emptyln();
    };
    const error = (e: MsgEventAnyArgs) => {
      loggerEvent.log.error(e.args);
    };
    const write = (e: MsgEventAnyArgs) => {
      loggerEvent.log.write(e.args);
    };
    const writeln = (e: MsgEventAnyArgs) => {
      loggerEvent.log.writeln(e.args);
    };
    const warn = (e: MsgEventAnyArgs) => {
      loggerEvent.log.warn(e.args);
    };
    //#endregion Log write methods

    //#region vebose write methods
    // tslint:disable-next-line: variable-name
    const emptylnVerbose = (_e: CancelEventArgs) => {
      loggerEvent.log.emptyln();
    };
    const errorVerbose = (e: MsgEventAnyArgs) => {
      loggerEvent.log.error(e.args);
    };
    const writeVerbose = (e: MsgEventAnyArgs) => {
      loggerEvent.log.write(e.args);
    };
    const writelnVerbose = (e: MsgEventAnyArgs) => {
      loggerEvent.log.writeln(e.args);
    };
    const warnVerbose = (e: MsgEventAnyArgs) => {
      loggerEvent.log.warn(e.args);
    };
    //#endregion verbose write methods
    //#endregion Internal Methods
    if (remove) {
      this.removeHandlerBeforeEmptyln(emptyln);
      this.removeHandlerBeforeError(error);
      this.removeHandlerBeforeWrite(write);
      this.removeHandlerBeforeWriteln(writeln);
      this.removeHandlerBeforeWarn(warn);

      this.removeHandlerBeforeEmptylnVerbose(emptylnVerbose);
      this.removeHandlerBeforeErrorVerbose(errorVerbose);
      this.removeHandlerBeforeWriteVerbose(writeVerbose);
      this.removeHandlerBeforeWritelnVerbose(writelnVerbose);
      this.removeHandlerBeforeWarnVerbose(warnVerbose);
    } else {
      this.addHandlerBeforeEmptyln(emptyln);
      this.addHandlerBeforeError(error);
      this.addHandlerBeforeWrite(write);
      this.addHandlerBeforeWriteln(writeln);
      this.addHandlerBeforeWarn(warn);

      this.addHandlerBeforeEmptylnVerbose(emptylnVerbose);
      this.addHandlerBeforeErrorVerbose(errorVerbose);
      this.addHandlerBeforeWriteVerbose(writeVerbose);
      this.addHandlerBeforeWritelnVerbose(writelnVerbose);
      this.addHandlerBeforeWarnVerbose(warnVerbose);
    }
  }

  public registerLoggerEvents(loggerEvent: ILogger) {
    this.registrationHandler(loggerEvent);
  }
  public unRegisterLoggerEvents(loggerEvent: ILogger) {
    this.registrationHandler(loggerEvent, true);
  }

  //#endregion logger registration

  //#endregion Handlers

}
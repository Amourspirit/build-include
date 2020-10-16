//#region Imports
import { ILogger } from "../interface/projectInterfaces";
import { LogEvent } from "./LogEvent";
import { MsgEventAnyArgs } from "../event/MsgEventAnyArgs";
import { EventArgs } from "../event/EventArgs";
import { CancelEventArgs } from "../event/CancelEventArgs";
//#endregion Imports

/**
 * Logger raises events containing logging messags.
 * If Verbose [[isVerbose]] is true then verbose logging will raise events as well.
 */
export class LoggerEvent implements ILogger {

	/**
	 * Creates a new instance of class
	 */
	constructor() {
		this.log = new LogEvent();
		this.verbose = new LogEvent();
		this.isVerbose = false;
		this.log.isVerbose = true;
	}
	/**
	 * Logger that does the general logging
	 */
	log: LogEvent;
	/**
	 * Logger that does the verbose logging
	 */
	verbose: LogEvent;

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

	//#region Handlers
	
	//#region Add Handlers

	//#region Handlers log
	public addHandlerBeforeEmptyln(callback: (e: CancelEventArgs) => void) {
		this.log.addHandlerBeforeEmptyln(callback);
	}
	public addHandlerAfterEmptyln(callback: (e: EventArgs) => void) {
		this.log.addHandlerAfterEmptyln(callback);
	}

	public addHandlerBeforeError(callback: (e: MsgEventAnyArgs) => void) {
		this.log.addHandlerBeforeError(callback);
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
	public addHandaddHandlerAfterWarnlerWarn(callback: (e: MsgEventAnyArgs) => void) {
		this.log.addHandlerAfterWarn(callback);
	}
	//#endregion Handlers Log

	//#region handlers Verbose
	public addHandlerBeforeEmptylnVerbose(callback: (e: CancelEventArgs) => void) {
		this.verbose.addHandlerBeforeEmptyln(callback);
	}
	public addHandlerAfterEmptylnVerbose(callback: (e: EventArgs) => void) {
		this.verbose.addHandlerAfterEmptyln(callback);
	}

	public addHandlerBeforeErrorVerbose(callback: (e: MsgEventAnyArgs) => void) {
		this.verbose.addHandlerBeforeError(callback);
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
	public addHandaddHandlerAfterWarnlerWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
		this.verbose.addHandlerAfterWarn(callback);
	}
	//#endregion Handlers Verbose

	//#endregion Add Handlers
	
	//#region Remove Handlers
	
	//#region Handlers log
	public removeHandlerBeforeEmptyln(callback: (e: CancelEventArgs) => void) {
		this.log.removeHandlerBeforeEmptyln(callback);
	}
	public removeandlerAfterEmptyln(callback: (e: EventArgs) => void) {
		this.log.removeHandlerAfterEmptyln(callback);
	}

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
	public removeHandaddHandlerAfterWarnlerWarn(callback: (e: MsgEventAnyArgs) => void) {
		this.log.removeHandlerAfterWarn(callback);
	}
	//#endregion Handlers Log

	//#region handlers Verbose
	public removeHandlerBeforeEmptylnVerbose(callback: (e: CancelEventArgs) => void) {
		this.verbose.removeHandlerBeforeEmptyln(callback);
	}
	public removeHandlerAfterEmptylnVerbose(callback: (e: EventArgs) => void) {
		this.verbose.removeHandlerAfterEmptyln(callback);
	}

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
	public removeHandaddHandlerAfterWarnlerWarnVerbose(callback: (e: MsgEventAnyArgs) => void) {
		this.verbose.removeHandlerAfterWarn(callback);
	}
	//#endregion Handlers Verbose
	
	//#endregion Remove Handlers
	
	//#endregion Handlers
	
}
//#region Imports
import { ILog } from "../interface/projectInterfaces";
import * as util from 'util';
import { EOL } from 'os';
import { Events } from "../event/Events";
import { MsgEventArgs } from "../event/MsgEventArg";
import { EventArgs } from "../event/EventArgs";
import { CancelEventArgs } from "../event/CancelEventArgs";
//#endregion Imports

/**
 * Simple Loging. Outputs to StdOut
 */
export class LogSimple implements ILog {
	//#region fields
	public isVerbose: boolean = false;
	public preFix = '[Build-Include]:';
	private events: Events;
	//#endregion fields

	//#region Constructor
	constructor() {
		this.events = new Events();
	}
	//#endregion constructor

	//#region ILog Methods
	/**
	 * Log Errors method
	 * @param args Arguments to write
	 */
	public error(...args: any[]): void {
		if (this.isVerbose === true) {
			const mArgs = new MsgEventArgs();
			mArgs.message = this.preFix + ' ' + this.foramted(...args);
			mArgs.message = mArgs.message.trim();
			this.onBeforeError(mArgs);
			if (mArgs.cancel === true) {
				return;
			}
			process.stdout.write(mArgs.message);
			process.stdout.write(EOL);
			this.onAfterError(mArgs);
		}
	}

	/**
	 * Write a new ling to the log
	 * @param args one or more string args to write
	 */
	public write(...args: string[]): void {
		if (this.isVerbose === true) {
			const mArgs = new MsgEventArgs();
			mArgs.message = this.foramted(...args);
			this.onBeforeWrite(mArgs);
			if (mArgs.cancel === true) {
				return;
			}
			process.stdout.write(mArgs.message);
			this.onAfterWrite(mArgs);
		}
	}
	/**
	 * Log standard line
	 * @param args Arguments to write
	 */
	public writeln(...args: any[]): void {
		if (this.isVerbose === true) {
			const mArgs = new MsgEventArgs();
			mArgs.message = this.preFix + ' ' + this.foramted(...args);
			mArgs.message = mArgs.message.trim();
			this.onBeforeWriteln(mArgs);
			if (mArgs.cancel === true) {
				return;
			}
			process.stdout.write(mArgs.message);
			process.stdout.write(EOL);
			this.onAfterWriteln(mArgs);
		}
	}
	/**
	* Write warning to log
	@param args Arguments to write
	*/
	public warn(...args: any[]): void {
		if (this.isVerbose === true) {
			const mArgs = new MsgEventArgs();
			mArgs.message = this.preFix + ' Warning: ' + this.foramted(...args);
			mArgs.message = mArgs.message.trim();
			this.onBeforeWarn(mArgs);
			if (mArgs.cancel === true) {
				return;
			}
			process.stdout.write(mArgs.message);
			process.stdout.write(EOL);
			this.onAfterWarn(mArgs);
		}
	}
	/**
	* Write a line terminator to log
	*/
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
	//#endregion ILog Methods

	//#region Formatting
	private foramted(...args: any[]): string {
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
	//#endregion

	//#region  Events

	//#region Raise Events
	protected onBeforeError(e: MsgEventArgs) {
		this.events.trigger('beforeError', e);
	}
	protected onAfterError(e: MsgEventArgs) {
		this.events.trigger('afterError', e);
	}

	protected onBeforeWrite(e: MsgEventArgs) {
		this.events.trigger('beforeWrite', e);
	}
	protected onAfterWrite(e: MsgEventArgs) {
		this.events.trigger('afterWrite', e);
	}

	protected onBeforeWriteln(e: MsgEventArgs) {
		this.events.trigger('beforeWriteln', e);
	}
	protected onAfterWriteln(e: MsgEventArgs) {
		this.events.trigger('afterWriteln', e);
	}

	protected onBeforeWarn(e: MsgEventArgs) {
		this.events.trigger('beforeWarn', e);
	}
	protected onAfterWarn(e: MsgEventArgs) {
		this.events.trigger('afterWarn', e);
	}

	protected onBeforeEmptyln(e: CancelEventArgs) {
		this.events.trigger('beforeEmptyln', e);
	}
	protected onAfterEmptyln(e: EventArgs) {
		this.events.trigger('afterEmptyln', e);
	}
	//#endregion Raise Events

	//#region Event Handlers
	//#region Add Event Handlers
	public addHandlerBeforeError(callback: (e: MsgEventArgs) => void) {
		this.events.on('beforeError', callback);
	}
	public addHandlerAfterError(callback: (e: MsgEventArgs) => void) {
		this.events.on('afterError', callback);
	}
	public addHandlerBeforeWrite(callback: (e: MsgEventArgs) => void) {
		this.events.on('beforeWrite', callback);
	}
	public addHandlerAfterWrite(callback: (e: MsgEventArgs) => void) {
		this.events.on('afterWrite', callback);
	}
	public addHandlerBeforeWriteln(callback: (e: MsgEventArgs) => void) {
		this.events.on('beforeWriteln', callback);
	}
	public addHandlerAfterWriteln(callback: (e: MsgEventArgs) => void) {
		this.events.on('afterWriteln', callback);
	}
	public addHandlerBeforeWarn(callback: (e: MsgEventArgs) => void) {
		this.events.on('beforeWarn', callback);
	}
	public addHandlerAfterWarn(callback: (e: MsgEventArgs) => void) {
		this.events.on('afterWarn', callback);
	}
	public addHandlerBeforeEmptyln(callback: (e: CancelEventArgs) => void) {
		this.events.on('beforeEmptyln', callback);
	}
	public addHandlerAfterEmptyln(callback: (e: EventArgs) => void) {
		this.events.on('afterEmptyln', callback);
	}
	//#endregion Add Event Handlers

	//#region Remove Event Handlers
	public removeHandlerBeforeError(callback: (e: MsgEventArgs) => void) {
		this.events.off('beforeError', callback);
	}
	public removeHandlerAfterError(callback: (e: MsgEventArgs) => void) {
		this.events.off('afterError', callback);
	}
	public removeHandlerBeforeWrite(callback: (e: MsgEventArgs) => void) {
		this.events.off('beforeWrite', callback);
	}
	public removeHandlerAfterWrite(callback: (e: MsgEventArgs) => void) {
		this.events.off('afterWrite', callback);
	}
	public removeHandlerBeforeWriteln(callback: (e: MsgEventArgs) => void) {
		this.events.off('beforeWriteln', callback);
	}
	public removeHandlerAfterWriteln(callback: (e: MsgEventArgs) => void) {
		this.events.off('afterWriteln', callback);
	}
	public removeHandlerBeforeWarn(callback: (e: MsgEventArgs) => void) {
		this.events.off('beforeWarn', callback);
	}
	public removeHandlerAfterWarn(callback: (e: MsgEventArgs) => void) {
		this.events.off('afterWarn', callback);
	}
	public removeHandlerBeforeEmptyln(callback: (e: CancelEventArgs) => void) {
		this.events.off('beforeEmptyln', callback);
	}
	public removeHandlerAfterEmptyln(callback: (e: EventArgs) => void) {
		this.events.off('afterEmptyln', callback);
	}
	//#endregion remove Event Handlers
	//#endregion Event Handlers

	//#endregion Events
}

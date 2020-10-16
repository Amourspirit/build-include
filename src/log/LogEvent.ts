import { ILog } from "../interface/projectInterfaces";
import { Events } from "../event/Events";
import { MsgEventAnyArgs } from "../event/MsgEventAnyArgs";
import { EventArgs } from "../event/EventArgs";
import { CancelEventArgs } from "../event/CancelEventArgs";
// export type msgEventArgs = (...args:any[]) => void;
/**
 * Does not output. Triggers Events containing log messages.
 */
export class LogEvent implements ILog {
	public isVerbose: boolean = false;
	private events: Events;
	// tslint:disable-next-line: no-empty
	constructor() {
		this.events = new Events();
	}

	//#region  ILog Methods
	/**
	 * Log Errors method
	 * @param args Arguments to write
	 */
	public error(...args: any[]): void {
		if (this.isVerbose === true) {
			const mArgs = new MsgEventAnyArgs();
			mArgs.args = [...args];
			this.onBeforeError(mArgs);
			if (mArgs.cancel === true) {
				return;
			}
			this.onAfterError(mArgs)
		}
	}

	/**
	 * Write a new ling to the log
	 * @param args one or more string args to write
	 */
	public write(...args: string[]): void {
		if (this.isVerbose === true) {
			const mArgs = new MsgEventAnyArgs();
			mArgs.args = [...args];
			this.onBeforeWrite(mArgs);
			if (mArgs.cancel === true) {
				return;
			}
			this.onAfterWrite(mArgs)
		}
	}
	/**
	 * Log standard line
	 * @param args Arguments to write
	 */
	public writeln(...args: any[]): void {
		if (this.isVerbose === true) {
			const mArgs = new MsgEventAnyArgs();
			mArgs.args = [...args];
			this.onBeforeWriteln(mArgs);
			if (mArgs.cancel === true) {
				return;
			}
			this.onAfterWriteln(mArgs)
		}
	}
	/**
	* Write warning to log
	@param args Arguments to write
	*/
	public warn(...args: any[]): void {
		if (this.isVerbose === true) {
			const mArgs = new MsgEventAnyArgs();
			mArgs.args = [...args];
			this.onBeforeWarn(mArgs);
			if (mArgs.cancel === true) {
				return;
			}
			this.onAfterWarn(mArgs)
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
			this.onAfterEmptyln(EventArgs.Empty);
		}
	}
	//#endregion Ilog methods

	//#region Events

	//#region Raise Events
	protected onBeforeError(e: MsgEventAnyArgs) {
		this.events.trigger('beforeError', e);
	}
	protected onAfterError(e: MsgEventAnyArgs) {
		this.events.trigger('afterError', e);
	}

	protected onBeforeWrite(e: MsgEventAnyArgs) {
		this.events.trigger('beforeWrite', e);
	}
	protected onAfterWrite(e: MsgEventAnyArgs) {
		this.events.trigger('afterWrite', e);
	}

	protected onBeforeWriteln(e: MsgEventAnyArgs) {
		this.events.trigger('beforeWriteln', e);
	}
	protected onAfterWriteln(e: MsgEventAnyArgs) {
		this.events.trigger('afterWriteln', e);
	}

	protected onBeforeWarn(e: MsgEventAnyArgs) {
		this.events.trigger('beforeWarn', e);
	}
	protected onAfterWarn(e: MsgEventAnyArgs) {
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
	public addHandlerBeforeError(callback: (e: MsgEventAnyArgs) => void) {
		this.events.on('beforeError', callback);
	}
	public addHandlerAfterError(callback: (e: MsgEventAnyArgs) => void) {
		this.events.on('afterError', callback);
	}
	public addHandlerBeforeWrite(callback: (e: MsgEventAnyArgs) => void) {
		this.events.on('beforeWrite', callback);
	}
	public addHandlerAfterWrite(callback: (e: MsgEventAnyArgs) => void) {
		this.events.on('afterWrite', callback);
	}
	public addHandlerBeforeWriteln(callback: (e: MsgEventAnyArgs) => void) {
		this.events.on('beforeWriteln', callback);
	}
	public addHandlerAfterWriteln(callback: (e: MsgEventAnyArgs) => void) {
		this.events.on('afterWriteln', callback);
	}
	public addHandlerBeforeWarn(callback: (e: MsgEventAnyArgs) => void) {
		this.events.on('beforeWarn', callback);
	}
	public addHandlerAfterWarn(callback: (e: MsgEventAnyArgs) => void) {
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
	public removeHandlerBeforeError(callback: (e: MsgEventAnyArgs) => void) {
		this.events.off('beforeError', callback);
	}
	public removeHandlerAfterError(callback: (e: MsgEventAnyArgs) => void) {
		this.events.off('afterError', callback);
	}
	public removeHandlerBeforeWrite(callback: (e: MsgEventAnyArgs) => void) {
		this.events.off('beforeWrite', callback);
	}
	public removeHandlerAfterWrite(callback: (e: MsgEventAnyArgs) => void) {
		this.events.off('afterWrite', callback);
	}
	public removeHandlerBeforeWriteln(callback: (e: MsgEventAnyArgs) => void) {
		this.events.off('beforeWriteln', callback);
	}
	public removeHandlerAfterWriteln(callback: (e: MsgEventAnyArgs) => void) {
		this.events.off('afterWriteln', callback);
	}
	public removeHandlerBeforeWarn(callback: (e: MsgEventAnyArgs) => void) {
		this.events.off('beforeWarn', callback);
	}
	public removeHandlerAfterWarn(callback: (e: MsgEventAnyArgs) => void) {
		this.events.off('afterWarn', callback);
	}
	public removeHandlerBeforeEmptyln(callback: (e: CancelEventArgs) => void) {
		this.events.off('beforeEmptyln', callback);
	}
	public removeHandlerAfterEmptyln(callback: (e: EventArgs) => void) {
		this.events.off('afterEmptyln', callback);
	}
	//#endregion Remove Event Handlers

	//#endregion Event Handlers

	//#endregion Events
}

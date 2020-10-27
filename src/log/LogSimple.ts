//#region Imports
import * as util from 'util';
import { EOL } from 'os';
import { EventArgs } from "../event/EventArgs";
import { CancelEventArgs } from "../event/CancelEventArgs";
import { LogEvent } from "./LogEvent";
import { MsgEventAnyArgs } from "../event/MsgEventAnyArgs";
//#endregion Imports

/**
 * Simple Loging. Outputs to StdOut
 */
export class LogSimple extends LogEvent {
	//#region fields
	public preFix = '[Build-Include]:';
	//#endregion fields

	//#region Constructor
	constructor() {
		super();
	}
	//#endregion constructor

	//#region ILog Methods
	/**
	 * Log Errors method
	 * @param args Arguments to write
	 */
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
	/**
	 * Log standard line
	 * @param args Arguments to write
	 */
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
			const mArgs = new MsgEventAnyArgs();
			mArgs.message = this.preFix + ' Warning: ' + this.foramted(...args);
			mArgs.message = mArgs.message.trim();
			mArgs.args = args;
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
}

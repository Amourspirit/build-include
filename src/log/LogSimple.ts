import { ILog } from "../interface/projectInterfaces";
import * as util from 'util';
import { EOL } from 'os';
/**
 * Simple Loging. Outputs to StdOut and Console
 */
export class LogSimple implements ILog {
	public isVerbose: boolean = false;
	public preFix = '[Build-Include]: ';
	// tslint:disable-next-line: no-empty
	constructor() {
	}
	/**
	 * Log Errors method
	 * @param args Arguments to write
	 */
	public error(...args: any[]): void {
		if (this.isVerbose === true) {
			// tslint:disable-next-line: no-console
			console.error(this.preFix, this.foramted(...args));
		}
	}

	/**
	 * Write a new ling to the log
	 * @param args one or more string args to write
	 */
	public write(...args: string[]): void {
		if (this.isVerbose === true) {
			process.stdout.write(this.foramted(...args));
		}
	}
	/**
	 * Log standard line
	 * @param args Arguments to write
	 */
	public writeln(...args: any[]): void {
		if (this.isVerbose === true) {
			// FLog(this.preFix, ...args);
			// tslint:disable-next-line: no-console
			console.log(this.preFix, this.foramted(...args));
		}
	}
	/**
	* Write warning to log
	@param args Arguments to write
	*/
	public warn(...args: any[]): void {
		if (this.isVerbose === true) {
			// tslint:disable-next-line: no-console
			console.warn(this.preFix,'Warning: ', this.foramted(...args));
		}
	}
	/**
	* Write a line terminator to log
	*/
	public emptyln(): void {
		if (this.isVerbose === true) {
			process.stdout.write(EOL);
		}
	}

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
}

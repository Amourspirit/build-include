import { ILog } from "../interface/projectInterfaces";
/**
 * Class to log nothing.
 * This class intentionally do no logging.
 * To be used with no logging output is needed.
 */
export class LogNull implements ILog {
	public isVerbose: boolean = false;
	// tslint:disable-next-line: no-empty
	constructor() {
	}
	/**
	* Do Not Log Errors method (write nothing)
	* @param _args Arguments to complete ignore in this instance
	*/
	// tslint:disable-next-line:
	public error(..._args: any[]): void {
		if (this.isVerbose === true) {
			// do nothing
		}
	}
	/**
	* Do Not Write a new ling to the log (write nothing)
	* @param _args Arguments to complete ignore in this instance
	*/
	public write(..._args: string[]): void {
		if (this.isVerbose === true) {
			// do nothing
		}
	}
	/**
	* Do Not Log standard line (write nothing)
	* @param _args Arguments to complete ignore in this instance
	*/
	public writeln(..._args: any[]): void {
		if (this.isVerbose === true) {
			// do nothing
		}
	}
	/**
	* Do Not Write warning to log (write nothing)
	@param _args Arguments to complete ignore in this instance
	*/
	public warn(..._args: any[]): void {
		if (this.isVerbose === true) {
			// do nothing
		}
	}
	/**
	* Do Not Write a line terminator to log (write nothing)
	*/
	public emptyln(): void {
		if (this.isVerbose === true) {
			// do nothing
		}
	}
}
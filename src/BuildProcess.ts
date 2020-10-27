// #region imports
import { eKind } from "./enums/enumEKind";
import { eProcess } from "./enums/enumEProcess";
import {
	IBuildIncludeOpt,
	IMatchOpt,
	IBiOpt,
	IOpt,
	IMatchType,
	ILogger,
	InternalOptType
} from "./interface/projectInterfaces";
import {
	matchKind,
	triState
} from "./enums/projectEnums";
import {
	getBiOptionsDefault,
	defaultOptions
} from './opt/defaultOptions';
import { MergeOptions } from "./opt/MergeOptions";
import { Util } from './util/Util';
import * as fs from 'fs';
import * as path from 'path';

// see: https://github.com/inxilpro/node-app-root-path
// see: https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
import * as appRoot from 'app-root-path';
import { LoggerEvent } from "./log/LoggerEvent";
import { FenceProcess } from './process/FenceProcess';
import { ArgsUtil } from './util/ArgsUtil';
import { CommentProcess } from './process/CommentProcess';
import { StringUtil } from './util/StringUtil';
import { TextProcess } from './process/TextProcess';
import { BreakStringProcess } from './process/BreakStringProcess';
import { MatchProcess } from "./process/MatchProcess";
import { MatchOptionsProcess } from "./process/MatchOptionsProcess";
// #endregion

/**
 * Class that does all the work of replacing BUILD_INCLUDE statments in a files contents.  
 * See [Online Docs](https://amourspirit.github.io/build-include/pages/Docs/index.html)
 */
export class BuildProcess {
	// #region Properties
	/**
	 * When true verbose logging will take place.
	 * State to determine if verbose logging will be used.
	 * This options can be overriddend by [[IOpt.verbose]]
	 */
	public verbose: boolean = false;
	private isRecursive: boolean = false;
	public logger: ILogger;
	private fenceProcess: FenceProcess;
	private commentProcess: CommentProcess;
	private textProcess: TextProcess;
	private breakStringProcess: BreakStringProcess;
	private matchProcess: MatchProcess;
	private matchOptionsProcess: MatchOptionsProcess;
	// #endregion
	// #region constructor
	/**
	 * Constructs a new instace of class
	 * @param {ILogger} [logModule] the logger used to output results of build include,
	 * If excluede then will default to LoggerNull
	 * See [[LoggerNull]]
	 */

	public constructor(logModule?: ILogger) {
		if (logModule) {
			this.logger = logModule;
		} else {
			this.logger = new LoggerEvent();
		}
		this.setVerbose(this.verbose);
		this.fenceProcess = new FenceProcess();
		this.fenceProcess.registerLoggerEvents(this.logger);

		this.commentProcess = new CommentProcess();
		this.commentProcess.registerLoggerEvents(this.logger);

		this.textProcess = new TextProcess();
		this.textProcess.registerLoggerEvents(this.logger);

		this.matchProcess = new MatchProcess();
		this.matchProcess.registerLoggerEvents(this.logger);

		this.breakStringProcess = new BreakStringProcess();
		this.breakStringProcess.registerLoggerEvents(this.logger);

		this.matchOptionsProcess = new MatchOptionsProcess();
		this.matchOptionsProcess.registerLoggerEvents(this.logger);

	}
	// #endregion

	// #region buildInclude
	/**
	 * Reads BUILD_INCLUDE statements in contenst and replaces the
	 * BUILD_INCLUDE statment base upon the parameters in the BUILD_INCLUDE statment.
	 * @description
	 * [[include:docs/BuildProcess/buildInclude.md]]
	 * @param fileContents The string to search and replace BUILD_INCLUDE statements
	 * If empty string is passed in for this parameter then file contents from srcPath will be 
	 * read and loaded.
	 * @param srcPath The source path of the contents. this path is required and may be use to resolve relative paths
	 * to other include files.
	 * @param opt The options for  the current taks If not options or empty options are passed
	 * in then default options [[defaultOptions]] will be used.
	 */
	public buildInclude(fileContents: string, srcPath: string, opt?: IOpt): string {
		if (typeof opt !== 'object') {
			opt = {};
		}
		//#region Internal Methods		
		const joinRootPath = (strPath: string): string => {
			let result = strPath;
			if (strPath.startsWith(appRoot.path) === false) {
				result = path.join(appRoot.path, strPath);
			}
			return result;
		}
		const options: IBiOpt = Util.mergeDefaults(defaultOptions, opt);
		if (options.verbose) {
			this.verbose = options.verbose;
		} else {
			this.verbose = false;
		}
		//#endregion Internal Methods

		// const optMatch = new MergeMatch(options, this.logger).getMergedMatchOptions();
		const sourcePath = this.processFilePath(srcPath);

		//#region Internal Methods
		const getInternalOption = <T extends InternalOptType>(localOpt: IBiOpt, key: string, defaultVal: T): T => {
			const interanlVal = localOpt.internal[key];
			if (typeof interanlVal === typeof defaultVal) {
				return <T>interanlVal;
			}
			return defaultVal;
		};

		const setOption = (localOpt: IBiOpt, key: string, value: InternalOptType) => {
			localOpt.internal[key] = value;
		};
		const isRecursiveCall = (): boolean => {
			if (getInternalOption<number>(options, "recursiveCount", 0) > 0) {
				return true;
			}
			return false;
		};

		const getRecursiveOptions = (): IBiOpt => {
			// set the recursive flag to pass to next call
			const newOpt = Util.deepCopy(options);
			setOption(options, 'recursive', 'true');
			// newOpt.internal.recursive = 'true';
			newOpt.internal.recursiveCount = getInternalOption<number>(options, "recursiveCount", 0) + 1;
			newOpt.internal.recursiveStr = getInternalOption<string>(options, "recursiveStr", '.');
			if (newOpt.internal.recursiveStr) {
				newOpt.internal.recursiveStr = newOpt.internal.recursiveStr + '.';
			}
			return newOpt;
		};
		const loadContetFromPath = (): string => {
			let returnContent = '';
			if (!fs.existsSync(sourcePath)) {
				this.logger.log.error("Path '" + srcPath + "' does not exist.");
				throw new Error("Path '" + srcPath + "' does not exist.");

			}
			returnContent = fs.readFileSync(sourcePath, { encoding: Util.encoding('utf8') });
			if (returnContent.length === 0) {
				returnContent = '';
			}
			return returnContent;
		};
		//#endregion Internal Methods

		let contents = fileContents;
		if (!contents) {
			contents = loadContetFromPath();
		}

		this.isRecursive = isRecursiveCall();

		this.matchOptionsProcess.process(options.match)
		if (this.isRecursive === false) {
			if (this.matchOptionsProcess.isValid) {
				// assign match for recursive calls for a little less processing on recursive calls
				opt.match = this.matchOptionsProcess.options;
			}
			options.fence = this.fenceProcess.getOptionFence(options);
		}

		if (this.matchOptionsProcess.isValid === false) {
			this.logger.log.warn(`options.match.name is missing`);
			return contents;
		}

		const nameRegex = this.matchOptionsProcess.regexSimple;
		const mainProcess = (strFileContents: string): string => {
			const indexIndent: number = 1;
			const re = this.matchOptionsProcess.regexMain;
			const indexFile = this.matchOptionsProcess.indexFile;
			const indexOrigMatch = this.matchOptionsProcess.indexOrigMatch;
			const indexOpt = this.matchOptionsProcess.indexOption;
			const allowIndent = this.matchOptionsProcess.allowIndent;
			let result: string = strFileContents;
			if (sourcePath && sourcePath.length > 0) {
				this.logger.log.writeln(`[${path.relative(appRoot.path, sourcePath)}] has ${this.matchOptionsProcess.name}:`);
			}


			let match: RegExpExecArray | null;

			match = re.exec(result);
			let innerReplacemnets: Record<string, string> = {};

			//#region Internal Methods
			const getRecursiveContents = (fileContent: string, strPath: string): string => {
				if (this.verbose) {
					this.logger.verbose.writeln(`Recursive file found: '${path.relative(appRoot.path, this.processIncludeFilePath(strPath, this.matchOptionsProcess.options))}'`);
				}
				const recursiveBuildProcess: BuildProcess = new BuildProcess(this.logger);
				// replace the fileContent with the new content from the recursion.
				return recursiveBuildProcess.buildInclude(fileContent, strPath, getRecursiveOptions());
			};
			const getNoRecursiveContent = (outerContnet: string, innerContent: string, filePath: string, innerMatch: RegExpExecArray): string => {
				let inContent = innerContent;
				const outterMatch: RegExpExecArray = (match as RegExpExecArray);
				if (this.verbose) {
					this.logger.verbose.writeln(`Found inner match: '${filePath}'. Inserting Placeholder`);
				}
				inContent = insertPlaceholder(inContent, innerMatch[indexOrigMatch]);

				const strResult = outerContnet.replace(outterMatch[indexOrigMatch], inContent);
				if (strResult === outerContnet) {
					this.logger.log.error('Failed to insert placeholder');
					this.setVerbose(isLastIterationVerbose);
					throw new Error(`Failed to insert placeholder in '${srcPath}'`);
				}

				return strResult;
			};

			/**
			 * insert a placeholder for match and stores the original match
			 * @param {string} inputStr contents of file
			 * @param {RegExpExecArray} mStr match array
			 */
			const insertPlaceholder = (inputStr: string, mStr: string): string => {
				const rnStr = Util.genAlphStr(32);
				// store the replacement to restore later
				innerReplacemnets[rnStr] = mStr;
				const rx = new RegExp(Util.escapeRegex(mStr), 'g');

				const strResult = inputStr.replace(rx, rnStr);
				if (strResult === inputStr) {
					this.logger.log.error('Failed to insert placeholder');
					throw new Error(`Failed to insert placeholder in '${srcPath}'`);
				}
				return strResult;
			};
			/**
			 * Restores any placeholders that were put in place with original values
			 * @param {string} str the contents of file
			 */
			const resotrePlacholers = (str: string): string => {
				let strResult = str;
				for (const key in innerReplacemnets) {
					if (Object.prototype.hasOwnProperty.call(innerReplacemnets, key)) {
						const rep = innerReplacemnets[key];
						const rx = new RegExp(Util.escapeRegex(key), 'g');
						strResult = strResult.replace(rx, rep);
					}
				}
				innerReplacemnets = {};
				return strResult;
			};

			const isIncludeFileOK = (strPath: string): boolean => {
				let bResult = true;
				const outterMatch: RegExpExecArray = (match as RegExpExecArray);
				if (!fs.existsSync(strPath)) {
					if (options.ignoreMissing === false) {
						this.logger.log.error("Path '" + strPath + "' does not exist.");
						this.setVerbose(isLastIterationVerbose);
						throw new Error("Path '" + strPath + "' does not exist.");
					} else {
						this.logger.log.warn('Could not find file to include: ', strPath);
						// take care of the missing import file by replaceing he import with a placeholder.
						result = insertPlaceholder(result, outterMatch[indexOrigMatch]);
						match = re.exec(result);
						bResult = false;
					}
				}
				return bResult;
			};

			const setOptionVerbose = (hasOpt: boolean, biOpt: IBuildIncludeOpt) => {
				if (hasOpt === true) {
					if (biOpt.verbose === triState.true) {
						// if verbose is not turned on then it will be turned of
						// for the rest of this file procsssing and recursive files.
						this.setVerbose(true)
					} else if (biOpt.verbose === triState.false) {
						this.setVerbose(false);
					}
				}
			};
			//#endregion Internal Methods
			if (this.isRecursive) {
				if (getInternalOption<string>(options, 'recursiveStr', ''))
					this.logger.log.write(getInternalOption<string>(options, 'recursiveStr', ''));
				this.logger.log.writeln(`Recursively loading file: ${path.relative(appRoot.path, this.processIncludeFilePath(srcPath, this.matchOptionsProcess.options))}`);
			}
			const isLastIterationVerbose = this.verbose;

			while (match !== null) {

				const biOpt: IBuildIncludeOpt = getBiOptionsDefault();
				let fileContent: string;
				this.logger.log.write('.');
				this.logger.verbose.emptyln();
				this.logger.verbose.writeln('Match array: ' + match);

				let filePath: string = this.processIncludeFilePath(match[indexFile], this.matchOptionsProcess.options);
				if (filePath.length === 0) {
					this.logger.log.error(`No valid file name for replacement: '${match[indexOrigMatch]}' in: '${srcPath}'`);
					result = insertPlaceholder(result, match[indexOrigMatch]);
					match = re.exec(result);
					continue;
				}

				if (this.verbose) {
					this.logger.verbose.writeln(`File to embed: '${filePath}'`);
				}
				if (path.isAbsolute(filePath) === true) {
					filePath = joinRootPath(filePath);
				} else {
					// file included as buldinclude will have their path recognized
					// as relative to the buldinclude file itself.
					filePath = path.join(path.dirname(sourcePath), filePath);
				}
				if (isIncludeFileOK(filePath) === false) {
					continue;
				}
				
				fileContent = fs.readFileSync(filePath, { encoding: Util.encoding(options.encoding) });

				let innerMatch: RegExpExecArray | null;
				innerMatch = re.exec(fileContent);

				if (innerMatch !== null) {
					if (options.recursion === true) {
						fileContent = getRecursiveContents(fileContent, filePath);
					} else {
						result = getNoRecursiveContent(result, fileContent, filePath, innerMatch);
						match = re.exec(result);
						continue;
					}
				}

				// If options were set, then parse them
				let hasOptions: boolean = false;
				// process all options
				if (match[indexOpt]) {
					hasOptions = this.processOptions(indexIndent, indexOpt, match, biOpt);
				} // if (match[indexOpt])

				// check to see if any options were set at the options level passed in.
				// and merge them if exist.
				hasOptions = new MergeOptions(biOpt, options).isBiMergedOptions() || hasOptions;
				
				setOptionVerbose(hasOptions, biOpt);
				if (allowIndent === false) {
					biOpt.text.indent = false;
				}
				// now that all the options have been parsed process based upon options
				// if no options are set then do a straight replace;
				if (hasOptions === false) {
					// with a straight replace no need to consider indent
					result = result.replace(match[indexOrigMatch], fileContent);
					match = re.exec(result);
					continue;
				}
				if (hasOptions === true) {
					// read setting from hightest to lowest prority
					if (biOpt.text.noLineBreaks === true)
						fileContent = this.removeLnB(fileContent);
					if (biOpt.asJsString === true)
						fileContent = StringUtil.stringDecodeEncode(fileContent, eKind.jsString, eProcess.encode);
					if (biOpt.text.isCode)
						fileContent = StringUtil.stringDecodeEncode(fileContent, biOpt.text.code, biOpt.text.codeKind);
				} // if (match[indexOpt]) process all options

				if (allowIndent === true
					&& biOpt.text.isSet === true
					&& biOpt.text.indent === true) {
					biOpt.indent = match[1];
				}

				// do not replace indent
				let replaceIndex: number = indexOrigMatch;
				if (allowIndent === false
					|| (biOpt.text.isSet && biOpt.text.indent === true)) {
					// replace indent as well.
					replaceIndex = 0;
				}
				const matchArr: Array<IMatchType> = this.getMatchArray(fileContent, biOpt);
				fileContent = this.matchProcess.processMatch(biOpt, matchArr);
				if (biOpt.text.isSet === true) {
					if (biOpt.text.before.length > 0)
						fileContent = biOpt.text.before + fileContent;
					if (biOpt.text.after.length > 0)
						fileContent += biOpt.text.after;
				}
				result = result.replace(match[replaceIndex], fileContent);
				match = re.exec(result);
			} // while (match !== null)
			if (this.isRecursive === false) {
				this.logger.log.emptyln();
			}
			this.setVerbose(isLastIterationVerbose);
			result = resotrePlacholers(result);
			return result;
		};

		if (nameRegex.exec(contents)) {
			contents = mainProcess(contents);
		}
		return contents;

	}; // end: buildInclude()
	// #endregion

	// #region Process Methods

	/**
	 * Sets the verbose state of logging.
	 * @param verbose if true verbose loggign will take place; Otherwise,
	 * verbose logging will be disabled.
	 * 
	 * If state is currently in a recursive procdess thatn verbose options will not change.
	 */
	private setVerbose(verbose: boolean) {
		if (this.isRecursive === false) {
			this.verbose = verbose;
			this.logger.isVerbose = verbose;
		}
	}

	//  #region processOptions
	/**
	 * Process options and assigns any found options into biOpt.
	 * @param indexIndent The index of indent in the build_include match.
	 * @param indexOpt The index of options in the build_include match.
	 * @param match The current buld_includ ( or variation of ) match.
	 * @param biOpt The current options. This parameter is an object and
	 * will be potentially modified by this method.
	 * @returns Returns `true` if any options were found: Otherwise, `false`.
	 */
	private processOptions(indexIndent: number, indexOpt: number, match: RegExpExecArray, biOpt: IBuildIncludeOpt): boolean {
		const fileIncludeOptions: string[] = ArgsUtil.splitArgsComma(match[indexOpt]);
		let hasOptions: boolean = false;
		// test for asjsstring
		if (this.isOptionSetAsJsString(fileIncludeOptions, biOpt)) {
			hasOptions = true;
		}
		if (this.breakStringProcess.isOptionBreakStringSet(fileIncludeOptions, biOpt) === true) {
			hasOptions = true;
		}
		// test fo text options
		if (this.textProcess.isOptionTextSet(fileIncludeOptions, biOpt)) {
			hasOptions = true;
			if (biOpt.text.indent === true) {
				if (match[indexIndent]) {
					biOpt.indent = match[indexIndent];
				}
			}
		}
		// test for comment
		if (this.commentProcess.isOptionCommentSet(fileIncludeOptions, biOpt)) {
			hasOptions = true;
		}
		if (this.fenceProcess.isOptionFenceSet(fileIncludeOptions, biOpt)) {
			hasOptions = true;
		}
		if (this.isOptionVerboseSet(fileIncludeOptions, biOpt)) {
			hasOptions = true;
		}
		return hasOptions;
	}
	//  #endregion
	//  #region processFilePath
	/**
	 * Process File Path of build_include
	 * Normalizes the path as well.
	 * @param strFile The current matched file from build_replacement ( or variation of ).
	 * @param optMatch Match options for matching build_include in files.
	 * 
	 * If the path contains <rootDir> it get replaced with the actual root directery in this method
	 */
	private processIncludeFilePath(strFile: string, optMatch: IMatchOpt): string {
		if (!strFile) {
			return '';
		}
		let filePath: string = path.normalize(strFile);
		// optMath.path will be '' or a parent path to append to the file
		// process.cwd() returns the current working directory,
		// __dirname returns the directory name of the directory containing the JavaScript source code file
		// if file path starts with <rootDir> then replace it
		filePath = filePath.trim();
		const rootRx = /^<rootDir>/i;
		let hasRoot = false;
		if (filePath.match(rootRx)) {
			hasRoot = true;
			filePath = filePath.replace(rootRx, ''); // remove <rootDir> from path
		}

		filePath = path.join(optMatch.path, filePath);
		if (hasRoot) {
			filePath = path.join(appRoot.path, filePath);
		}
		if (filePath.length === 0) {
			return '';
		}
		filePath = this.unixifyPath(filePath);
		return filePath;
	}



	//  #endregion
	//#region processFilePath
	/**
	 * Processes incoming file path.
	 * @param strFile File path to process
	 * 
	 * Path is normalized
	 * If path contains <rootDir> it is swaped for app root dir.
	 */
	private processFilePath(strFile: string): string {
		if (!strFile) {
			return '';
		}
		let filePath: string = path.normalize(strFile)
		// if file path starts with <rootDir> then replace it
		filePath = filePath.trim();
		const rootRx = /^<rootDir>/i;
		if (filePath.match(rootRx)) {
			filePath = filePath.replace(rootRx, ''); // remove <rootDir> from path
			filePath = path.join(appRoot.path, filePath);
		}
		// path.isAbsolute return true for any path that starts with /
		if (path.isAbsolute(filePath)) {
			if (filePath.startsWith(appRoot.path) === false) {
				filePath = path.join(appRoot.path, filePath);
			}
		} else {
			filePath = path.join(appRoot.path, filePath);
		}
		if (filePath.length === 0) {
			return '';
		}
		filePath = this.unixifyPath(filePath);
		return filePath;
	}
	//#endregion processFilePath

	// #endregion
	// #region Get Options Methods
	//  #region getOptionsAsJsString
	/**
	 * Check opts for asjsstring and assigns any found options to biOpt
	 * @description
	 * The only option to be set is <em>asjsstring</em>
	 *
	 * Sets option for [biOpt.asJsString]{@link IBuildIncludeOpt.asJsString}
	 * 
	 * **AsJsString** is basicly an alias for:
	 *
	 * >`text?code=jsString&kind=encode`
	 * @param opts The array of options to search for break string options in
	 * @param biOpt The current options. This parameter is an object and
	 * will be potentially modified by this method.
	 * @example
	 * 
	 * [[include:docs/BuildProcess/getOptionsAsJsStringEx.md]]
	 */
	private isOptionSetAsJsString(opts: string[], biOpt: IBuildIncludeOpt): boolean {
		const asjRx: RegExp = /\s*asjsstring\s*/i;
		if (
			opts.some(option => {
				/*
				 * Test to seee if asjsstring is present in the options
				 * If asjsstring is present the string will be encode as a javascript string.
				 * Combined with break string will will result in a multi-line
				 * string with line ending escapes \
				 */
				if (asjRx.test(option)) {
					biOpt.asJsString = true;
					return true;
				}
				return false;
			})
		) {
			return true;
		}
		return false;
	}
	//  #endregion
	//#region getOptionsVerbose
	/**
	 * Check opts for verbose and assigns any found options to biOpt
	 * @param opts The array of options to search for break string options in
	 * @param biOpt The current options. This parameter is an object and
	 */
	private isOptionVerboseSet(opts: string[], biOpt: IBuildIncludeOpt): boolean {
		biOpt.verbose = triState.unset;
		// match verbose only means set to true
		// match verbose=true or verbose=false and set accordingly
		const rx: RegExp = /\s*(verbose)(\s*=\s*true|\s*=\s*false)?/i;
		if (
			opts.some(option => {
				/*
				 * Test to seee if verbose is present in the options
				 */
				if (rx.test(option)) {
					let cMatch: RegExpExecArray | null;
					cMatch = rx.exec(option);
					if (cMatch) {
						if (cMatch[2]) {
							let str = cMatch[2]; // = true or = false
							str = str.replace('=', '').trim().toLowerCase();
							biOpt.verbose = triState.parseLoose(str);
							if (biOpt.verbose === triState.true) {
								return true;
							} else {
								return false;
							}
						} else {
							biOpt.verbose = triState.true;
							return true;
						}
					}
				}
				return false;
			})
		) {
			return true;
		}
		return false;
	}
	//#endregion getOptionsVerbose

	// #endregion  
	// #region Build String methods


	// #endregion
	// #region Comment Methods

	// #endregion
	// #region padding methods

	// #endregion


	// #region misc methods
	//  #region removeLnB
	/**
		* Replaces all instance of the \r\n then replaces all \n then finally
		* replaces all \r. It goes through and removes all types of line breaks
		* @param str String to replace line breaks in
		*/
	private removeLnB(str: string): string {
		if (str.length === 0) {
			return '';
		}
		return str.replace(/(\r\n|\n|\r)/gm, '');
	};
	//  #endregion

	//  #region unixifyPath
	/**
	 * Converts a path to Unix style if this is windows and
	 * @param filepath Path to convert from window to unix style
	 */
	private unixifyPath(filepath: string): string {
		return filepath.replace(/\\/g, path.sep);
	};
	//  #endregion

	// #endregion
	/**
	 * Get an array of match matches that contains matches and if
	 * [[IBuildIncludeOpt.fence]] is set in the options or settings [[IBiOpt.fence]]
	 * is set then the return array may contain fences as well.
	 * @param fileContent 
	 * @param biOpt 
	 */
	private getMatchArray(fileContent: string, biOpt: IBuildIncludeOpt): Array<IMatchType> {
		const result: Array<IMatchType> = [];
		if (biOpt.regexFence === undefined) {
			result.push({
				kind: matchKind.normal,
				value: fileContent,
			});
			return result;
		}
		const re: RegExp = biOpt.regexFence;
		let contents: string = fileContent;
		let match: RegExpExecArray | null;

		match = re.exec(contents);
		if (match === null) {
			result.push({
				kind: matchKind.normal,
				value: contents,
			});
			return result;
		}
		while (match !== null) {
			// we have a fenced match.
			// if contents currently starts with fence then empty string will become the current segment
			let segment = contents.substring(0, match.index - 1);
			if (segment.length > 0) {
				// add normal segment
				result.push({
					kind: matchKind.normal,
					value: segment
				});
			}
			// now the fenced section
			const len = match[0].length
			let endIndex = (len - 1) + match.index;
			if (endIndex < 0) {
				endIndex = 0;
			}

			segment = contents.substr(match.index, len);
			// if option remove=true was set then do not add fence
			// all fenced section will be omitted by design when remove=true
			if (biOpt.fence.remove === false) {
				result.push({
					kind: matchKind.fence,
					value: segment
				});
			}

			// remove everything that has been process thus far.
			contents = contents.substring(endIndex + 1);
			match = re.exec(contents);
		}
		// if there are any remaining content the push it as normal.
		if (contents.length > 0) {
			result.push({
				kind: matchKind.normal,
				value: contents
			});
		}
		return result;
	}

}

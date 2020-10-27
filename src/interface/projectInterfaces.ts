import { eKindType } from "../enums/enumEKind";
import { eProcessType } from "../enums/enumEProcess";
import { lnEndOpt, splitByOpt, widthFlags } from 'string-breaker';
import { commentKind, matchKind, fenceKind, whiteSpLn, triState } from "../enums/projectEnums";
import { MsgEventAnyArgs } from "../event/MsgEventAnyArgs";
import { CancelEventArgs } from "../event/CancelEventArgs";
import { EventArgs } from "../event/EventArgs";

type LogType<T> = (...args: T[]) => void;
export type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";
export type InternalOptType = undefined | string | number | boolean;

/**
 * Options for buildInclude
 */
export interface IBuildIncludeOpt {
  /** break string options */
  bs: IBreakString;
  /** Boolean flag that is true when options asJsString is set */
  asJsString: boolean;
  /** comment options */
  comment: IComment;
  /** text options */
  text: IText;
  /** Array to hold line if file contents that is to be inserted. */
  lines: string[];
  /** holds the indent if it exist */
  indent?: string;
  /**
  * [[include:docs/IFence/IFence.md]]
  */
  fence: IFence;
  /**
   * Reguular expression that represents fence values.
   */
  regexFence?: RegExp;
  /** Options that can me passed from one method to the next */
  opt: IKeyValue<string>;

  /**
 * Determins if logging should be done in a verbose mannor. If true then verbose logging will be turned on;
 * Otherwise, normal logging.
 */
  verbose: triState;
}
/** break string options */
export interface IBreakString {
  /**
    * How should line splits be done.
    * line, width, word
    * @see [string-breaker Enumeration splitByOpt]{@link https://amourspirit.github.io/node-string-breaker/enums/_main_.splitbyopt.html}
    */
  break: splitByOpt;
  /**
   * How shold line ending be handled.
   * encode, noLnBr, none
   * @see [string-breaker Enumeration lnEndOpt]{@link https://amourspirit.github.io/node-string-breaker/enums/_main_.lnendopt.html}
   */
  lineEnd: lnEndOpt;
  /**
   * An integer representing the number of chars to break string.
   * @see [string-breaker]{@link https://amourspirit.github.io/node-string-breaker/index.html}
   */
  width: number;
  /**
   * Flags to set for width.
   * @see [string-breaker Enumeration widthFlags]{@link https://amourspirit.github.io/node-string-breaker/enums/_main_.widthflags.html}
   */
  flags: widthFlags;
  /** Boolean flag that is true when break string options are set */
  isSet: boolean;

  /**
  * Text to prepend to return string;
  */
  before: string;
  /**
  * Text to append to return string;
  */
  after: string;
}
/**
 * Represents Comment fromating for the options of a Buld_Include type of statement
 */
export interface IComment {
  /** The kind of commenting to apply */
  type: commentKind;
  /**
   * [[include:docs/IComment/padLeft.md]]
   */
  padLeft: string | number;
  /** Boolean flag that is true if padLeft is include in text options */
  padLeftAssigned: boolean;
  /** Boolean flag that is true when comment options are set */
  isSet: boolean;
};
/**
 * [[include:docs/IPadding/IPadding.md]]
*/
export interface IPadding {
  /** Boolean flag that is true if padLeft is include in text options */
  padLeftAssigned: boolean;
  /** Boolean flag that is true if padRight is include in text options */
  padRigtAssigned: boolean;
  /**
   * [[include:docs/IPadding/padLeft.md]]
   */
  padLeft: string | number;
  /**
   * [[include:docs/IPadding/padRight.md]]
   */
  padRight: string | number;
}
/**
 * [[include:docs/IText/IText.md]]
 */
export interface IText {
  /**
     * [[include:docs/IText/before.md]]
     */
  before: string;
  /**
   * [[include:docs/IText/after.md]]
   */
  after: string;
  /**
   * [[include:docs/IText/padding.md]]
   */
  padding: IPadding;
  /**
   * [[include:docs/enums/ekind/eKind.md]]
   */
  code: eKindType;
  /**
   * [[include:docs/enums/eProcess/eProcess.md]]
   */
  codeKind: eProcessType;
  /**
   * [[include:docs/IText/indent.md]]
   */
  indent: boolean;
  /**
   * Boolean flag that determins if line breaks should be removed from contents of a file that is
   * to be inserted. Default is false.
   * 
  */
  noLineBreaks: boolean;
  /**
   * How to process white space lines.
   */
  whiteSpaceLine: whiteSpLn;
  /** Boolean flag that is true when encoding or decoding options are set */
  isCode: boolean;
  /** Boolean flag that is true when text options are set */
  isSet: boolean;
};
/**
 * Type that represents process method
 */
export type ProcessFn = (contents: string, srcpath: string, destpath: string) => (string | boolean);
/**
 * Represents an anonymous function
 */
export type AnonymousFn = () => any;

/** Options for build settings */
export interface IOpt {
  /**
   * Default file encoding
  */
  encoding?: BufferEncoding;

  /**
   * Determines if recursion should be used.
   * If recursion is true then build include files will be searched for matches as also
   * replaced in a recursive manner
   */
  recursion?: boolean;
  /**
   * Determins if missing files should be ignored when processing.  
   * If true then missing files will be ignored. Oherwise missing files
   * will generate an error.
   */
  ignoreMissing?: boolean,

  /**
   * [[include:includes/match/match.md]]
   * 
   * @See [build_include option match](/pages/Docs/GruntFile/Options/match/)
   */
  match?: IMatchOpt | string | number;
  /** Comment options */
  comment?: IOptComment;
  /** Text options */
  text?: IOptText;
  /**
   * breakstring options or number that is the default value for width
   * of breakstring. All other values will be default values.
   * 
   * @see [string-breaker]{@link https://amourspirit.github.io/node-string-breaker/}
   */
  breakstring?: IOptBreakString | number;
  /**
   * Fence Options If string then will be parsed as [[fenceKind]] using
   * [[fenceKind.parse]]
   */
  fence?: IFence | string | number;
  /**
   * Determines if replacement should be treated as a javascript string.
   * If `true` BUILD_INCLUDE replacements files are treated as javascript strings.
   */
  asJsString?: boolean;
  /**
   * Determines if any settings in the file should be overriden by the settings in the gruntfile.
   * `true` Gruntfile Setting are overriden; Otherwise, any options in the inline BREAKSTRING_INCLUDE will
   * take priority.
   */
  override?: boolean;
  /**
   * Determins if logging should be done in a verbose mannor. If true then verbose logging will be turned on;
   * Otherwise, normal logging.
   */
  verbose?: boolean;

  /**
   * for internal use only. Not documented on purpose 
   */
  internal?: Record<string, InternalOptType>;
}
/**
 * Internal Options for build settings.
 * Some options are required where as [[IOpt]] does not require any options be set.
 * This interface is purly for internal usage. Esentally a mirror of [[IOpt]] with some options required.
 * */
export interface IBiOpt {
  /**
   * [[include:includes/encoding/encoding.md]]
  */
  encoding: BufferEncoding;
  /**
   * Determines if recursion should be used.
   * If recursion is true then build include files will be searched for matches as also
   * replaced in a recursive manner
   */
  recursion: boolean;
  /**
   * Determins if missing files should be ignored when processing.  
   * If true then missing files will be ignored. Oherwise missing files
   * will generate an error.
   */
  ignoreMissing: boolean,
  /**
   * [[include:includes/match/match.md]]
   * 
   * @See [build_include option match](/pages/Docs/GruntFile/Options/match/)
   */
  match: IMatchOpt | string | number;
  /** Comment options */
  comment?: IOptComment;
  /** Text options */
  text?: IOptText;
  /**
   * breakstring options or number that is the default value for width
   * of breakstring. All other values will be default values.
   * 
   * @see [string-breaker]{@link https://amourspirit.github.io/node-string-breaker/}
   */
  breakstring?: IOptBreakString | number;
  /**
   * Fence Options If string then will be parsed as [[fenceKind]] using
   * [[fenceKind.parse]]
   */
  fence?: IFence | string | number;
  /**
   * Determines if replacement should be treated as a javascript string.
   * If `true` BUILD_INCLUDE replacements files are treated as javascript strings.
   */
  asJsString?: boolean;
  /**
   * Determines if any settings in the file should be overriden by the settings in the gruntfile.
   * `true` Gruntfile Setting are overriden; Otherwise, any options in the inline BREAKSTRING_INCLUDE will
   * take priority.
   */
  override?: boolean;
  /**
   * Determins if logging should be done in a verbose mannor. If true then verbose logging will be turned on;
   * Otherwise, normal logging.
   */
  verbose?: boolean;

  /**
   * for internal use only. Not documented on purpose 
   */
  internal: Record<string, InternalOptType>;
}
/**
 * [[include:docs/matchOpt/IMatchOpt.md]]
 */
export interface IMatchOpt {
  /**
   * [[include:docs/matchOpt/path.md]]
   */
  path: string;
  /**
   * [[include:docs/matchOpt/name.md]]
   */
  name: string;
  /**
   * [[include:docs/matchOpt/fileName.md]]
   */
  fileName: string;
  /**
   * [[include:docs/matchOpt/parameters.md]]
   */
  parameters: string;
  /**
   * [[include:docs/matchOpt/prefix.md]]
   */
  prefix: string;
  /**
   * [[include:docs/matchOpt/suffix.md]]
   */
  suffix: string;
  /** 
   * [[include:docs/matchOpt/options.md]]
   */
  options: string;
  /**
   * [[include:docs/matchOpt/kind.md]]
   */
  kind: string;
  /**
   * [[include:docs/matchOpt/matchFileIndex.md]]
   */
  indexFile: number;
  /**
  * [[include:docs/matchOpt/matchParamIndex.md]]
  */
  indexParam: number;
}
/** break string options */
interface IOptBreakString {
  /**
    * How should line splits be done.
    * line, width, word
    * @see [string-breaker Enumeration splitByOpt]{@link https://amourspirit.github.io/node-string-breaker/enums/_main_.splitbyopt.html}
    */
  break?: string | number;
  /**
   * How shold line ending be handled.
   * encode, noLnBr, none
   * @see [string-breaker Enumeration lnEndOpt]{@link https://amourspirit.github.io/node-string-breaker/enums/_main_.lnendopt.html}
   */
  eol?: string | number;
  /**
   * An integer representing the number of chars to break string.
   * @see [string-breaker]{@link https://amourspirit.github.io/node-string-breaker/index.html}
   */
  width?: string | number;
  /**
   * Flags to set for width.
   * @see [string-breaker Enumeration widthFlags]{@link https://amourspirit.github.io/node-string-breaker/enums/_main_.widthflags.html}
   */
  flags?: string;
  /**
  * Text to prepend to return string;
  */
  before?: string;
  /**
   * Text to append to return string;
   */
  after?: string;
}
/**
 * [[include:docs/IOptComment/IOptComment.md]]
 * 
 * [[include:docs/IOptComment/example01.md]]
 */
interface IOptComment {
  /**
   * [[include:docs/IComment/padLeft.md]]
   */
  padleft?: string | number;
  /**
   * can be any enum value of: [[commentKind]] such as 'jsdoc'
   */
  type?: string | number;
}
/**
 * [[include:docs/IOptTextPadding/IOptTextPadding.md]]
 */
interface IOptTextPadding {
  /**
   * [[include:docs/IPadding/padLeft.md]]
   */
  padleft?: string | number;
  /**
   * [[include:docs/IPadding/padRight.md]]
   */
  padright?: string | number;
}
/**
 * [[include:docs/IOptText/IOptText.md]]
 */
interface IOptText {
  /**
     * Text to apply before the contents of a file that is to be inserted.
     * This is a literal string and can contain characters such as \n
     */
  before?: string;
  /**
   * Text to apply after the contents of a file that is to be inserted.
   * This is a literal string and can contain characters such as \n
   */
  after?: string;
  /** Padding options for each line of a file that is to be inserted. */
  padding?: IOptTextPadding;
  /**
     * The type of encoding or decoding to apply to the contents of a file that is to be inserted.
     * base64, base64Uri, jsString, tsString, uri, uriComponent
     */
  code?: string | number;
  /**
   * Determines if file contents are to be encode or decoded before insertion.
   * encode, decode
   */
  codekind?: string | number;
  /**
   * Determins if the replacment should attempt to keep white-space indent when the replacement occured
   */
  indent?: boolean | string;
  /**
   * How to process white space lines.
   */
  whiteSpaceLine?: whiteSpLn;
  /**
   * Boolean flag that determins if line breaks should be removed from contents of a file that is
   * to be inserted. Default is false.
   * 
  */
  nolinebreaks?: boolean | string;
}

// #region IOptFence
/**
 * [[include:docs/IOptFence/IOptFence.md]]
 */
export interface IOptFence extends Record<string, any> {
  /**
   * [[include:docs/IOptFence/start.md]]
   */
  start: string | RegExp;
  /**
   * [[include:docs/IOptFence/end.md]]
   */
  end: string | RegExp
}
// #endregion
// #region IFence
/**
 * [[include:docs/IFence/IFence.md]]
 */
export interface IFence extends IOptFence {
  /**
   * [[include:docs/IFence/type.md]]
   */
  type: fenceKind;
  /**
   * [[include:docs/IFence/remove.md]]
   */
  remove: boolean;
}
// #endregion
// #region IMatchType
/**
 * Interface for creating objects kind and value.
 * Used for fencing methods such as [[BuildProcess.processMatch]]
 */
export interface IMatchType {
  /**
   * The kind of match
   */
  kind: matchKind;
  /**
   * The match value
   */
  value: string;
}
// #endregion
// #regoin IKeyValueGeneric
/**
 * [[include:docs/IKeyValue/IKeyValue.md]]
 */
export interface IKeyValue<T> {
  [key: string]: T;
}
/**
 * Represents any item with a string key value
 */
export interface IKeyValueAny {
  [key: string]: any;
}
// #endregion
/**
 * Represents a generic item with a index key value
 */
export interface IIndex<T> {
  [key: number]: T;
}
export interface IIndexAny {
  [key: number]: any;
}
/**
 * Generic Clone method
 */
export interface IClone<T> {
  /** Clone object and return cloned object */
  clone(): T;
}
/**
 * Interface fro working with match Items white space
 * @see [[BuildProcess.processWhiteSpLns]]
 */
export interface IMatchItemWsItm {
  /** Array of lines */
  lines: string[],
  /** number of empty lines at start of lines */
  countStart: number,
  /** number of empty lines as end of lines */
  countEnd: number,
  /** Kind of match being processed */
  kind: matchKind
}

export interface ILogEvents {
  addHandlerBeforeError: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerAfterError: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerBeforeWrite: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerAfterWrite: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerBeforeWriteln: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerAfterWriteln: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerBeforeWarn: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerAfterWarn: (callback: (e: MsgEventAnyArgs) => void) => void
  addHandlerBeforeEmptyln: (callback: (e: CancelEventArgs) => void) => void,
  addHandlerAfterEmptyln: (callback: (e: EventArgs) => void) => void,
  removeHandlerBeforeError: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerAfterError: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerBeforeWrite: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerAfterWrite: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerBeforeWriteln: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerAfterWriteln: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerBeforeWarn: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerAfterWarn: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerBeforeEmptyln: (callback: (e: CancelEventArgs) => void) => void,
  removeHandlerAfterEmptyln: (callback: (e: EventArgs) => void) => void
}

export interface ILogEventsVerbose {
  addHandlerBeforeErrorVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerAfterErrorVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerBeforeWriteVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerAfterWriteVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerBeforeWritelnVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerAfterWritelnVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerBeforeWarnVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  addHandlerAfterWarnVerbose: (callback: (e: MsgEventAnyArgs) => void) => void
  addHandlerBeforeEmptylnVerbose: (callback: (e: CancelEventArgs) => void) => void,
  addHandlerAfterEmptylnVerbose: (callback: (e: EventArgs) => void) => void,
  removeHandlerBeforeErrorVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerAfterErrorVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerBeforeWriteVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerAfterWriteVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerBeforeWritelnVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerAfterWritelnVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerBeforeWarnVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerAfterWarnVerbose: (callback: (e: MsgEventAnyArgs) => void) => void,
  removeHandlerBeforeEmptylnVerbose: (callback: (e: CancelEventArgs) => void) => void,
  removeHandlerAfterEmptylnVerbose: (callback: (e: EventArgs) => void) => void
}
/**
 * Interface for creating loggers that can be passed to the constructor of [[BuildProcess]]
 * @see [[BuildProcess]]
 * @see [[LoggerSimple]]
 * @see [[LoggerNull]]
 */
export interface ILog extends ILogEvents {
  /**
   * Log Errors method
   */
  error: LogType<any>,
  /**
   * Write to log without a line terminator
   */
  write: LogType<any>,
  /**
   * Write a new ling to the log
   */
  writeln: LogType<any>,
  /**
   * Write warning to log
   */
  warn: LogType<any>,
  /**
   * Write a line terminator to log
   */
  emptyln: () => void
}

/**
 * Implements for creating a new Logger
 * @see [[LoggerSimple]]
 */
export interface ILogger extends ILogEvents, ILogEventsVerbose {
  /**
   * Gets or sets if the Logger is currently allowing verbose logging
   */
  isVerbose: boolean,
  /**
   * Normaly logger
   */
  log: ILog,
  /**
   * Verbose Logger
   */
  verbose: ILog
}

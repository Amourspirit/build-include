import { regexKind } from "../enums/projectEnums";
import { IMatchOpt } from "../interface/projectInterfaces";
import { MatchBracketInclude } from "../matches/MatchBracketInclude";
import { MatchBracketIncludeMulti } from "../matches/MatchBracketIncludeMulti";
import { MatchBuildInclude } from "../matches/MatchBuildInclude";
import { MatchBuildIncludeHtml } from "../matches/MatchBuildIncludeHtml";
import { MatchBuildIncludePound } from "../matches/MatchBuildIncludePound";
import { MatchBuildIncludeQuote } from "../matches/MatchBuildIncludeQuote";
import { MatchBuildIncludeSlash } from "../matches/MatchBuildIncludeSlash";
import { MatchDummy } from "../matches/MatchDummy";
import { DEFAULT_MATCH_KIND } from "../opt/defaultOptions";
import { Process } from "./Process";

export class MatchOptionsProcess extends Process {
  // https://regexr.com/4cjvh
  // https://regexr.com/4d14r revised April 27, 2019
  // const re = /(?:(?:\/\/)|(?:<\!\-\-)|(?:\/\*))[ \t]*BUILD_INCLUDE\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\)(?:(?:[\n\r]+)?\[(.*)\])?(?:(?:[ \t]*\-\->)|(?:[ \t]*\*\/))?/i;

  private _allowIndent: boolean = false;
  private _regexString: string = '';
  private _matchOptions: string = '';
  private _regexMain: RegExp | null = null;
  private _regexSimple: RegExp | null = null;
  private _options: IMatchOpt | null = null;
  private _isValid: boolean = false;
  private _indexFile: number = 0;
  private _indexOpt: number = 0;
  private _indexOrigMatch: number = 0;
  // private match: IMatchOpt|null = null;
  constructor() {
    super();
  }


  public get allowIndent(): boolean {
    return this._allowIndent;
  }
  public get regexMain() {
    if (this._regexMain) {
      return this._regexMain;
    }
    throw new Error("Process method is required to be called before regexMain property");
  }

  public get regexSimple() {
    if (this._regexSimple) {
      return this._regexSimple;
    }
    throw new Error("Process method is required to be called before regexSimple property");
  }

  public get options() {
    if (this._options) {
      return this._options;
    }
    throw new Error("Process method is required to be called before options property");
  }

  public get isValid(): boolean {
    return this._isValid;
  }

  public get name(): string {
    if (!this._options) {
      return '';
    }
    return this._options.name;
  }

  public get indexFile(): number {
    return this._indexFile;
  }
  public get indexOption(): number {
    return this._indexOpt
  }
  public get indexOrigMatch(): number {
    return this._indexOrigMatch;
  }

  public process(match: IMatchOpt | string | number) {
    // this.match = m;
    this._options = this.getMergedMatchOptions(match);
    this.setIsValid();
    if (this.isValid === false) {
      return;
    }

    // capture if options.suffix contain a ^ (start of line value)
    this.setAllowedIndent();
    this.setRegexString();

    this.setMatchOptions();
    this.logger.verbose.writeln(`Regex Full: /${this._regexString}/${this._matchOptions}`);
    this.setRegexMain();
    this.setRegexSimple();
  }

  private setIsValid() {
    if (!this._options) {
      this._isValid = false;
      return;
    }
    this._isValid = true;
    if (!this._options.name) {
      this._isValid = false;
    }
  }

  private setRegexString() {
    if (!this._options) {
      return;
    }

    if (this._allowIndent === true) {
      // match[1] will be the padding
      // match[2] will be the total replacement without padding
      // match[optMatch.indexFile + 2] will be the file segment
      // match[optMatch.indexOptions + 2] will be the options segment
      this._indexFile = this._options.indexFile + 2;   // adjust for indent
      this._indexOpt = this._options.indexParam + 2; // adjust for indent.
      this._indexOrigMatch = 2;
    } else {
      this._indexFile = this._options.indexFile;
      this._indexOpt = this._options.indexParam;
      this._indexOrigMatch = 0;
    }

    // regex capture group to capture indent
    const reGroup1 = `(^[ \\t]+)?`;
    let reGroup2: string = '';
    if (this._allowIndent === true) {
      reGroup2 += '(';
    }
    reGroup2 += `${this._options.prefix}${this._options.name}${this._options.fileName}${this._options.parameters}${this._options.suffix}`;

    if (this._allowIndent === true) {
      reGroup2 += ')';
      // also include indent at the start of the regex
      this._regexString = `${reGroup1}${reGroup2}`;
    } else {
      this._regexString = reGroup2;
    }

    this.logger.verbose.writeln(`Regex Match in: /${this._options.prefix}${this._options.name}${this._options.fileName}${this._options.parameters}${this._options.suffix}/${this._options.options}`);
  }

  private setAllowedIndent() {
    if (!this._options) {
      return;
    }
    let allowed = true;
    if (this._options.prefix.indexOf('^') >= 0) {
      allowed = false;
    }
    this._allowIndent = allowed;
  }

  private setMatchOptions() {
    if (!this._options) {
      return;
    }
    let mOpt: string = this._options.options;
    // multi line is required to check for start of line ^
    if (mOpt) {
      mOpt = mOpt.toLowerCase();
      if (mOpt.indexOf('m') === -1) {
        mOpt += 'm';
      }
    } else {
      mOpt = 'm';
    }
    this._matchOptions = mOpt;
  }

  private setRegexMain() {
    this._regexMain = new RegExp(this._regexString, this._matchOptions);
  }

  private setRegexSimple() {
    if (!this._options) {
      return;
    }
    this._regexSimple = new RegExp(`${this._options.prefix}${this._options.name}`, this._options.options);
  }
  /**
* Sets that match options from current passed in options and assigns any missing values that
* may of been ommited in the passed in options
* @returns Merged Options
*/
  private getMergedMatchOptions(match: IMatchOpt | string | number): IMatchOpt {
    let reKind: regexKind;
    if (typeof match === 'string' || typeof match === 'number') {
      reKind = regexKind.parse(match.toString());
      match = this.getPerferedMatch(reKind);
      return match;
    }
    if (typeof match !== 'object') {
      this.logger.log.error(`Expected match to be string, number or object`);
      match = this.getPerferedMatch(regexKind.buildInclude);
      return match;
    }
    //#region internal query functions
    const getMatchKind = () => {
      let result = matchBuild.kind;
      if (!matchBuild.kind || matchBuild.kind === MatchDummy.DEFAULT_STRING) {
        result = DEFAULT_MATCH_KIND;
      }
      return result;
    }

    const getMatchPath = (): string => {
      let result = matchBuild.path;
      if (matchBuild.path === MatchDummy.DEFAULT_STRING) {
        result = '';
      } else if (matchBuild.path === undefined) {
        result = matchDefaults.path;
      } else if (typeof matchBuild.path !== 'string') {
        this.logger.log.error(`Expected type string for match.path`);
        // throw new TypeError(`Expected type string for match.path`);
      }
      return result;
    }

    const getMatchName = (): string => {
      let result = matchBuild.name;
      if (matchBuild.name === undefined || matchBuild.name === MatchDummy.DEFAULT_STRING) {
        result = matchDefaults.name;
      } else if (typeof matchBuild.name !== 'string') {
        this.logger.log.error(`Expected type string for match.name`);
        // throw new TypeError(`Expected type string for match.name`);
      }
      return result;
    }

    const getMatchFileName = (): string => {
      let result = matchBuild.fileName;
      if (!matchBuild.fileName || matchBuild.fileName === MatchDummy.DEFAULT_STRING) {
        result = matchDefaults.fileName;
      } else if (typeof matchBuild.fileName !== 'string') {
        this.logger.log.error(`Expected type string for match.nfileNameame`);
        // throw new TypeError(`Expected type string for match.nfileNameame`);
      }
      return result;
    }
    const getMatchOptions = (): string => {
      let result = matchBuild.options;
      if (!matchBuild.options || matchBuild.options === MatchDummy.DEFAULT_STRING) {
        result = matchDefaults.options;
      } else if (typeof matchBuild.options !== 'string') {
        this.logger.log.error(`Expected type string for match.options`);
        // throw new TypeError(`Expected type string for match.options`);
      }
      return result;
    }
    const getmatchParameters = (): string => {
      let result = matchBuild.parameters;
      if (!matchBuild.parameters || matchBuild.parameters === MatchDummy.DEFAULT_STRING) {
        result = matchDefaults.parameters;
      } else if (typeof matchBuild.parameters !== 'string') {
        this.logger.log.error(`Expected type string for match.parameters`);
        // throw new TypeError(`Expected type string for match.parameters`);
      }
      return result;
    }
    const getMatchPrefix = (): string => {
      let result = matchBuild.prefix;
      if (!matchBuild.prefix || matchBuild.prefix === MatchDummy.DEFAULT_STRING) {
        result = matchDefaults.prefix;
      } else if (typeof matchBuild.prefix !== 'string') {
        this.logger.log.error(`Expected type string for match.prefix`);
        // throw new TypeError(`Expected type string for match.prefix`);
      }
      return result;
    }
    const getMatchSuffix = (): string => {
      let result = matchBuild.suffix;
      if (!matchBuild.suffix || matchBuild.suffix === MatchDummy.DEFAULT_STRING) {
        result = matchDefaults.suffix;
      } else if (typeof matchBuild.suffix !== 'string') {
        this.logger.log.error(`Expected type string for match.suffix`);
        // throw new TypeError(`Expected type string for match.suffix`);
      }
      return result;
    }
    const getMatchIndexFile = (): number => {
      let result = matchBuild.indexFile;
      if (typeof matchBuild.indexFile === 'string') {
        try {
          result = parseInt(matchBuild.indexFile, 10);
        } catch (error) {
          this.logger.log.warn(`Unable to parse match.indexFile. Expected a whole number`);
          result = 1;
        }
        result = 1;
      } else if (matchBuild.indexFile === MatchDummy.DEFAULT_NUMBER) {
        result = matchDefaults.indexFile;
      } else if (!matchBuild.indexFile) {
        result = 1;
      } else if (typeof matchBuild.indexFile !== 'number' && typeof matchBuild.indexFile !== 'string') {
        this.logger.log.error(`Expected type number for match.indexFile`);
        // throw new TypeError(`Expected type number for match.indexFile`);
      }
      if (result < 1) {
        result = Math.abs(result);
      }
      result = Math.round(result);
      return result;
    }
    const getMatchIndexParam = (): number => {
      let result = matchBuild.indexParam;
      if (typeof matchBuild.indexParam === 'string') {
        try {
          result = parseInt(matchBuild.indexParam, 10);
        } catch (error) {
          this.logger.log.warn(`Unable to parse match.indexOptions. Expected a whole number`);
          result = 2;
        }
      } else if (matchBuild.indexParam === MatchDummy.DEFAULT_NUMBER) {
        result = matchDefaults.indexParam;
      } else if (!matchBuild.indexParam) {
        result = matchDefaults.indexParam;
      } else if (typeof matchBuild.indexParam !== 'number' && typeof matchBuild.indexParam !== 'string') {
        this.logger.log.error(`Expected type number for match.indexParam`);
        // throw new TypeError(`Expected type number for match.indexParam`);
      }
      if (result < 2) {
        result = Math.abs(result);
      }
      result = Math.round(result);
      return result;
    }
    //#endregion internal query functions
    //#region internal Commands methods
    const indexWarningCheck = (): void => {
      if (matchBuild.indexFile === matchBuild.indexParam) {
        this.logger.log.warn(`match.indexOptions and match.indexFile have the same value of '${matchBuild.indexParam}'. This should never be the case!`);
      }
    }
    const setMatchProperties = (): void => {
      matchBuild.path = getMatchPath();
      matchBuild.name = getMatchName();
      matchBuild.fileName = getMatchFileName();
      matchBuild.options = getMatchOptions();
      matchBuild.parameters = getmatchParameters();
      matchBuild.prefix = getMatchPrefix();
      matchBuild.suffix = getMatchSuffix();
      matchBuild.indexFile = getMatchIndexFile();
      matchBuild.indexParam = getMatchIndexParam();
    }
    //#endregion

    const matchBuild: IMatchOpt = match;
    matchBuild.kind = getMatchKind();
    reKind = regexKind.parse(matchBuild.kind);
    const matchDefaults = this.getPerferedMatch(reKind);
    setMatchProperties();
    indexWarningCheck();
    match = matchBuild;
    return match;

  }

  private getPerferedMatch(kind: regexKind): IMatchOpt {
    switch (kind) {
      case regexKind.bracketInclude:
        return new MatchBracketInclude();
      case regexKind.buildIncludeHtml:
        return new MatchBuildIncludeHtml();
      case regexKind.buildIncludePound:
        return new MatchBuildIncludePound();
      case regexKind.buildIncludeSlash:
        return new MatchBuildIncludeSlash();
      case regexKind.bracketIncludeMulti:
        return new MatchBracketIncludeMulti();
      case regexKind.buildIncludeQuote:
        return new MatchBuildIncludeQuote();
      default:
        return new MatchBuildInclude();
    }
  }
}
import { MatchBracketInclude } from "../matches/MatchBracketInclude";
import { MatchBracketIncludeMulti } from "../matches/MatchBracketIncludeMulti";
import { MatchBuildInclude } from "../matches/MatchBuildInclude";
import { MatchBuildIncludeHtml } from "../matches/MatchBuildIncludeHtml";
import { MatchBuildIncludePound } from "../matches/MatchBuildIncludePound";
import { MatchBuildIncludeQuote } from "../matches/MatchBuildIncludeQuote";
import { MatchBuildIncludeSlash } from "../matches/MatchBuildIncludeSlash";
import { regexKind } from "../enums/projectEnums";
import { IBiOpt, ILogger, IMatchOpt } from "../interface/projectInterfaces";
import { MatchDummy } from "../matches/MatchDummy";
import { DEFAULT_MATCH_KIND } from "./defaultOptions";

/**
 * Handels Merging of options
 */
export class MergeMatch {
  private options: IBiOpt;
  private logger: ILogger;
  /**
   * Default constructor
   * @param options current options
   * @param logger current logger for output
   */
  constructor(options: IBiOpt, logger: ILogger) {
    this.options = options;
    this.logger = logger;
  }

/**
* Sets that match options from current passed in options and assigns any missing values that
* may of been ommited in the passed in options
* @returns Merged Options
*/
  public getMergedMatchOptions(): IMatchOpt {
    let reKind: regexKind;
    if (typeof this.options.match === 'string' || typeof this.options.match === 'number') {
      reKind = regexKind.parse(this.options.match.toString());
      this.options.match = this.getPerferedMatch(reKind);
      return this.options.match;
    }
    if (typeof this.options.match !== 'object') {
      this.logger.log.error(`Expected match to be string, number or object`);
      this.options.match = this.getPerferedMatch(regexKind.buildInclude);
      return this.options.match;
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

    const matchBuild: IMatchOpt = this.options.match;
    matchBuild.kind = getMatchKind();
    reKind = regexKind.parse(matchBuild.kind);
    const matchDefaults = this.getPerferedMatch(reKind);
    setMatchProperties();
    indexWarningCheck();
    this.options.match = matchBuild;
    return this.options.match;

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
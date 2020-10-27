// #region imports
import { IBiOpt, IBuildIncludeOpt } from "../interface/projectInterfaces";
// import * as mo from './matchOptions';
import { MatchDummy } from "../matches/MatchDummy";
import { commentKind, whiteSpLn, triState } from '../enums/projectEnums';
import { splitByOpt, lnEndOpt, widthFlags } from 'string-breaker';
import { eKind } from '../enums/enumEKind';
import { eProcess } from '../enums/enumEProcess';
import { NullFence } from "../fences/NullFence";
// #endregion

// #regionn CONSTANTS
export const DEFAULT_MATCH_KIND = 'buildInclude';
// export const DEFAULT_FENCE_START = `^{0}(?:([a-zA-Z]+)?(?:[\\r\\n]+))(?:[\\s\\S]+?)`;
// export const DEFAULT_FENCE_END = `^{0}(?:(?:$)|(?:[\\r\\n]+))`;
// #endregion
// #region defaultOptions
/**
 * Default options  
 * Implements: [[IBiOpt]]
 */
export const defaultOptions: IBiOpt = {

  /**
   * Defaut file encoding
   */
  encoding: "utf8",
  /**
  * Determins if recursion should be used.  
  * If recursion is true then build include files will be searched
  * for matches as also replaced in a recursive manor.  
  * Default value is true.
  */
  recursion: true,
  /**
   * Determins if missing files should be ignnore when processing.  
   * If true then missing files will be ignored. Oherwise missing files
   * will generate an error. Default is false.
   */
  ignoreMissing: false,

  /**
   * [[include:includes/match/match.md]]
   */
  match: new MatchDummy(),
  /*
   * for internal use only. Not documented on purpose
   */
  internal: {}
}
// #endregion

// #region getOptionsDefault
/**
 * Gets the default options
 */
export const getBiOptionsDefault = (): IBuildIncludeOpt => {
  const biOpt: IBuildIncludeOpt = {
    bs: {
      break: splitByOpt.width,
      lineEnd: lnEndOpt.noLnBr,
      width: 80,
      flags: widthFlags.none,
      isSet: false,
      before: '',
      after: ''
    },
    asJsString: false,
    comment: {
      type: commentKind.none,
      padLeft: 0,
      padLeftAssigned: false,
      isSet: false
    },
    text: {
      before: '',
      after: '',
      padding: {
        padLeftAssigned: false,
        padRigtAssigned: false,
        padLeft: 0,
        padRight: 0,
      },
      code: eKind.none,
      codeKind: eProcess.none,
      noLineBreaks: false,
      whiteSpaceLine: whiteSpLn.noAction,
      indent: false,
      isSet: false,
      isCode: false
    },
    fence: new NullFence(),
    lines: [],
    opt: {},
    verbose: triState.unset
  };
  return biOpt;
}
// #endregion

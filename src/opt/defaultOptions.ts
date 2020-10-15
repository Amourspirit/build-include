// #region imports
import { IBiOpt, IBuildIncludeOpt, IOptFence } from "../interface/projectInterfaces";
// import * as mo from './matchOptions';
import { MatchDummy } from "../matches/MatchDummy";
import { commentKind, fenceKind, whiteSpLn, triState } from '../enums/projectEnums';
import { splitByOpt, lnEndOpt, widthFlags } from 'string-breaker';
import { eKind } from '../enums/enumEKind';
import { eProcess } from '../enums/enumEProcess';
import { Util } from '../util/Util';
import { StrictFence } from "../fences/StrictFence";
import { FlexFence } from "../fences/FlexFence";
import { TildeFence } from "../fences/TildeFence";
import { EscapeFence } from "../fences/EscapeFence";
import { NullFence } from "../fences/NullFence";
// #endregion

// #regionn CONSTANTS
export const DEFAULT_MATCH_KIND = 'buildInclude';
export const DEFAULT_FENCE_START = `^{0}(?:([a-zA-Z]+)?(?:[\\r\\n]+))(?:[\\s\\S]+?)`;
export const DEFAULT_FENCE_END = `^{0}(?:(?:$)|(?:[\\r\\n]+))`;
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

/**
 * Gets a fence that it has has a start and end that can be used to
 * build a regular expression for processing fences in text.
 * @param kind The kind of fence to return
 */
export const getFenceKind = (kind: fenceKind): IOptFence | undefined => {
  switch (kind) {
    case fenceKind.strict:
      return new StrictFence();
    case fenceKind.flex:
      return new FlexFence();
    case fenceKind.escape:
      return new EscapeFence();
    case fenceKind.tilde:
      return new TildeFence();
    default:
      return undefined;
  }
}
/**
 * Creates a regular expression from fence.
 * The regular expression is used to match fences in content.
 * 
 * Example Fenced text:  
 * 
 *     ```text  
 *     This text is fenced  
 *     ```
 *
 * @param fence [[fenceKind]] enumeration value or object instance of [[IOptFence]]
 * or `undefined`.
 * 
 * If fence is string then it is parsed as [[fenceKind]].
 * If fence is `undefined` then return result will also be `undefined`.
 * @returns If fence can be converted to regular expression then a regular
 * expression is returned; Otherwise, `undefined`.
 */
export const getFenceOptions = (fence: string | number | IOptFence | undefined): RegExp | undefined => {
  if (fence === undefined) {
    return undefined;
  }
  let fceKind = fenceKind.none;
  let localFence: IOptFence | undefined;

  if (typeof fence === 'string' || typeof fence === 'number') {
    fceKind = fenceKind.parse(fence);
    localFence = getFenceKind(fceKind);
    if (localFence === undefined) {
      return undefined;
    }
  }
  //#region Qurey Methods Internal
  const getFenceFromObj = (): IOptFence | undefined => {
    let fenceResult: IOptFence | undefined;
    if (typeof fence === 'object') {
      // if any properties are missing defalut to to strictFence
      const standInFence = new NullFence();
      let hasProp: boolean = false;
      if (fence.hasOwnProperty('start')) {
        hasProp = true;
        standInFence.start = fence.start;
      }
      if (fence.hasOwnProperty('end')) {
        hasProp = true;
        standInFence.end = fence.end;
      }

      if (hasProp === true) {
        fenceResult = standInFence;
      }
    }
    return fenceResult;
  }
  const getLocalFenceValid = (): boolean => {
    let retval = true;
    if (localFence === undefined) {
      retval = false;
    } else if (!localFence.start) {
      retval = false;
    } else if (!localFence.end) {
      retval = false;
    }
    return retval;
  }
  const getRegexStart = (fenceStart: IOptFence | undefined): RegExp | undefined => {
    let retRx: RegExp | undefined;
    if (typeof fenceStart === 'object') {
      if (typeof fenceStart.start === 'string') {
        if (fenceStart.start.length > 0) {
          retRx = new RegExp(DEFAULT_FENCE_START.replace('{0}', Util.EscapeRegex(fenceStart.start)));
        }
      } else if (fenceStart.start instanceof RegExp) {
        retRx = fenceStart.start;
      }
    }
    return retRx;
  }
  const getRegexEnd = (fenceEnd: IOptFence | undefined): RegExp | undefined => {
    let retRx: RegExp | undefined;
    if (typeof fenceEnd === 'object') {
      if (typeof fenceEnd.end === 'string') {
        if (fenceEnd.end.length > 0) {
          retRx = new RegExp(DEFAULT_FENCE_END.replace('{0}', Util.EscapeRegex(fenceEnd.end)));
        }
      } else if (fenceEnd.end instanceof RegExp) {
        retRx = fenceEnd.end;
      }
    }
    return retRx;
  }
  //#endregion

  localFence = getFenceFromObj();
  if (getLocalFenceValid() === false) {
    return undefined;
  }
  const regStart = getRegexStart(localFence);
  if (regStart === undefined) {
    return undefined;
  }
  const regEnd = getRegexEnd(localFence);
  if (regEnd === undefined) {
    return undefined;
  }
  // use multiline
  const result: RegExp = new RegExp(`(${regStart.source}${regEnd.source})`, 'm');
  return result;
}

//#region Imports
import { Util } from "../util/Util";
import { IOptFence, IFence, IBuildIncludeOpt, IBiOpt } from "../interface/projectInterfaces";
import { TypeGuardFence } from "../typeGuard/TypeGuardFence";
import { fenceKind } from "../enums/projectEnums";
import { StrictFence } from "../fences/StrictFence";
import { TildeFence } from "../fences/TildeFence";
import { EscapeFence } from "../fences/EscapeFence";
import { NullFence } from "../fences/NullFence";
import { ArgsUtil } from "../util/ArgsUtil";
import { Process } from "./Process";
import { FlexFence } from "../fences/FlexFence";
//#endregion Imports
export class FenceProcess extends Process {
  //#region  Fields
  protected static DEFAULT_FENCE_START = `^({0})(?:([a-zA-Z]+)?(?:[\\r\\n]+))(?:[\\s\\S]+?)`;
  protected static DEFAULT_FENCE_END = `^({0})(?:(?:$)|(?:[\\r\\n]+))`;
  protected static DEFAULT_INDEX_START = 0;
  protected static DEFAULT_INDEX_END = 0;

  //#endregion Fields

  //#region Constructor
  constructor() {
    super();
  }
  //#endregion Constructor

  //#region Private methods
  //#region Private Class Methods

  //#region buildFenceRegex
  /**
   * Converts a fence into a Regular expression
   * @param fence Instance of fence to convert to regex
   */
  private buildFenceRegex(fence: IFence): RegExp {
    let regStart: RegExp;
    let regEnd: RegExp;
    let x: string;
    if (typeof fence.start === 'string') {
      if (this.isRegexStr(fence.start) === true) {
        x = fence.start.substr(1, fence.start.length - 1);
        regStart = new RegExp(x);
      } else {
        regStart = new RegExp(FenceProcess.DEFAULT_FENCE_START.replace('{0}', Util.escapeRegex(fence.start)));
      }
    } else if (fence.start instanceof RegExp) {
      regStart = fence.start;
    } else  {
      throw new Error("fence.start is expceted to be String or Regex");
    }
    if (typeof fence.end === 'string') {
      if (this.isRegexStr(fence.end) === true) {
        x = fence.end.substr(1, fence.end.length - 1);
        regEnd = new RegExp(x);
      } else {
        regEnd = new RegExp(FenceProcess.DEFAULT_FENCE_END.replace('{0}', Util.escapeRegex(fence.end)));
      }
    } else if (fence.end instanceof RegExp) {
      regEnd = fence.end;
    } else {
      throw new Error("fence.end is expceted to be String or Regex");
    }

    const result = new RegExp(`(${regStart.source}${regEnd.source})`, 'm');
    return result;
  }
  // #endregion buildFenceRegex

  //#region buildFenceMultiRegex Method
  /**
   * Combines [[strictFence]], [[tildeFence]] and [[escapeFence]] into one regular expression.
   */
  private buildFenceMultiRegex(): RegExp | undefined {
    const fStrict = FenceProcess.getFenceOptions(new StrictFence());
    const fTilde = FenceProcess.getFenceOptions(new TildeFence());
    const fEscape = FenceProcess.getFenceOptions(new EscapeFence());
    if (fStrict && fTilde && fEscape) {
      // It seems to me that order matters here.
      // first check for escape then tilde and lastly strict.
      // want to avoid selecting strict inside of escape or tilde.
      // https://markdownmonster.west-wind.com/docs/_5eg1brc0z.htm
      const re = new RegExp(`${fEscape.source}|${fTilde.source}|${fStrict.source}`, 'm');
      return re;
    }
    return undefined;
  }
  //#endregion buildFenceMultiRegex Method
  //#region isRegexStr
  /**
   * Test if a string starts and ends with /
   * @param s string to test
   */
  private isRegexStr(s: string): boolean {
    // should not be able to build a regex in less than 5 chars for this
    if (s.length < 5) {
      return false;
    }
    if (s.substr(0, 1) === '/' && s.substr(s.length - 1, 1) === '/') {
      return true;
    }
    return false;
  }
  // #endregion
  //#endregion Private Class Methods
  //#region Privte Statice Methods
  //#region assignFenceProperties
  private static assignFenceProperties(source: IOptFence, target: IOptFence) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const el = source[key];
        // note types can differ on some properites. eg: start can be string or regex
        if (typeof el !== "undefined"
          && typeof target[key] !== 'undefined') {
          target[key] = el;
        }
      }
    }
  };
  //#endregion assignFenceProperties

  //#endregion Privte Statice Methods
  //#endregion Private Methods

  //#region Public Methods
  //#region Public Class Methods
  //#region isOptionFenceSet Method
  /**
   * Get fence options
   * @param opts The array of options to search for fence options in
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns true if opts has fence options; Otherwise, false.
   */
  public isOptionFenceSet(opts: string[], biOpt: IBuildIncludeOpt): boolean {
    //#region Internal Methods
    const processOption = (args: string[]) => {
      const key = args[0].toLowerCase();
      switch (key) {
        case 'type':
          if (args.length === 2) {
            biOpt.fence.type = fenceKind.parse(args[1]);
          }
          break;
        case 'start':
          biOpt.fence.start = args[1];
          break;
        case 'end':
          biOpt.fence.end = args[1];
          break;
        case 'remove':
          if (args.length === 1) {
            // covers remove in query string without = value
            biOpt.fence.remove = true;
          } else if (args.length === 2) {
            let v: string = args[1];
            if (v.length === 0) {
              // allow remove=
              biOpt.fence.remove = true;
            }
            v = v.trim().toLowerCase();
            if (v === '1' || v === 'true') {
              biOpt.fence.remove = true;
            }
          }
          break;
        case 'indexstart':
          if (args.length === 2) {
            const iStart = parseInt(args[1], 10);
            if (isNaN(iStart) === false) {
              biOpt.fence.indexStart = iStart;
            }
          }
          break;
        case 'indexend':
          if (args.length === 2) {
            const iEnd = parseInt(args[1], 10);
            if (isNaN(iEnd) === false) {
              biOpt.fence.indexStart = iEnd;
            }
          }
          break;
        default:
          break;
      }
    };

    const processFenceCheckIfDefaultNeeded = () => {
      if (biOpt.fence.type === fenceKind.none) {
        if ((typeof biOpt.fence.start === 'string' && biOpt.fence.start.length === 0)
          || (typeof biOpt.fence.end === 'string' && biOpt.fence.end.length === 0)) {
          // Defalut to strict if start or end is not valid
          biOpt.fence.type = fenceKind.strict;
        }
      }
    };
    const processCurrentFence = () => {
      const currentFence: IOptFence | undefined = FenceProcess.getFenceKind(biOpt.fence.type);
      if (currentFence) {
        const fenceOpt: RegExp | undefined = FenceProcess.getFenceOptions(currentFence);
        if (fenceOpt) {
          biOpt.regexFence = fenceOpt;
        }
      }
    };
    const processRegexFence = () => {
      if (!biOpt.regexFence && biOpt.fence.type === fenceKind.none) {
        biOpt.regexFence = this.buildFenceRegex(biOpt.fence);
      }
      if (!biOpt.regexFence && biOpt.fence.type === fenceKind.multiFlex) {
        biOpt.regexFence = this.buildFenceMultiRegex();
      }
    };
    //#endregion Internal Methods
    const rxFence: RegExp = /\s*(fence(\?.*)?\s*)/i;
    if (
      opts.some(option => {
        if (rxFence.test(option)) {
          let cMatch: RegExpExecArray | null;
          cMatch = rxFence.exec(option);
          let hasOption: boolean = false;
          if (cMatch) {
            // it is irrelevant if any options are set.
            hasOption = true;
          }
          if (cMatch && cMatch[2]) {
            // get array of strings in format of name=value or name
            const opt = ArgsUtil.splitArgsAnd(cMatch[2]);
            opt.some(kv => {
              const eqArgs = ArgsUtil.splitArgsEq(kv);
              // must be a length of 1 or 2
              if (eqArgs.length === 0 || eqArgs.length > 2) {
                return false;
              }
              processOption(eqArgs);
              return false;
            });
          }
          return hasOption;
        }
        return false;
      })
    ) {
      this.logger.verbose.write('Fence options set: ');
      this.logger.verbose.writeln(Util.keyValueToString(biOpt.fence));
      processFenceCheckIfDefaultNeeded();
      processCurrentFence();
      processRegexFence();
      if (biOpt.regexFence) {
        return true;
      }
      return false;
    }
    return false;
  }
  //#endregion isOptionFenceSet Method
  //#region Method getOptionFence
  /**
   * Checks if fence options are assigned in the form of string,
   * number or object. If assigend then return value will be converted to
   *  of IFence
   */
  public getOptionFence(opts: IBiOpt): IFence | undefined {
    let result: IFence | undefined;
    if (opts.fence) {

      //#region get Fence Internal
      const isValidFence = (f: any): boolean => {
        if (!f) {
          return false;
        }
        if (TypeGuardFence.isFence(f)) {
          if ((!f.start)
            || (!f.end)) {
            return false;
          }
        } else {
          return false;
        }
        return true;
      };
      const getFenceFromString = () => {
        let resultFence: IFence | undefined;
        if (typeof opts.fence === 'string') {
          const tmpFence = FenceProcess.getFenceKind(fenceKind.parse(opts.fence));
          if (tmpFence) {
            resultFence = new NullFence();
            FenceProcess.assignFenceProperties(tmpFence, resultFence);
          }
        }
        return resultFence;
      };
      const getFenceFromNumber = () => {
        let resultFence: IFence | undefined;
        if (typeof opts.fence === 'number') {
          const tmpFence = FenceProcess.getFenceKind(fenceKind.parse(opts.fence));
          if (tmpFence) {
            resultFence = new NullFence();
            FenceProcess.assignFenceProperties(tmpFence, resultFence);
          }
        }
        return resultFence;
      };
      const getFenceFromObj = () => {

        let resultFence: IFence | undefined;
        if (typeof opts.fence === 'object') {
          if (TypeGuardFence.isFence(opts.fence)) {
            if (isValidFence(opts.fence)) {
              resultFence = opts.fence;
            }
          } else if (TypeGuardFence.isOptFence((<any>opts.fence))) {
            const tmpFence: IOptFence = (<IOptFence>opts.fence);
            resultFence = new NullFence();
            FenceProcess.assignFenceProperties(tmpFence, resultFence);
          }
        }

        return resultFence;
      };
      //#endregion get fence interanl

      if (typeof opts.fence === 'string') {
        result = getFenceFromString();
      } else if (typeof opts.fence === 'number') {
        result = getFenceFromNumber();
      } else if (typeof opts.fence === 'object') {
        result = getFenceFromObj();
      }
    }
    return result;
  }
  //#endregion Method getOptionFence
  //#endregion Public Class Methods
  //#region Public Static Methods
  //#region getFenceOptions
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
  public static getFenceOptions(fence: string | number | IOptFence | undefined): RegExp | undefined {
    if (fence === undefined) {
      return undefined;
    }
    let fceKind = fenceKind.none;
    let localFence: IOptFence | undefined;

    if (typeof fence === 'string' || typeof fence === 'number') {
      fceKind = fenceKind.parse(fence);
      localFence = this.getFenceKind(fceKind);
      if (localFence === undefined) {
        return undefined;
      }
    }
    //#region Qurey Methods Internal
    const getFenceFromObj = (): IOptFence | undefined => {
      let fenceResult: IOptFence | undefined;
      if (typeof fence === 'object') {
        // if any properties are missing defalut to to strictFence
        const standInFence: NullFence & Record<string, any> = new NullFence();
        let hasProp: boolean = false;
        for (const key in standInFence) {
          if (Object.prototype.hasOwnProperty.call(standInFence, key)) {
            const el: any = standInFence[key];
            if (fence.hasOwnProperty(key)) {
              if (typeof el !== "undefined"
                && typeof fence[key] !== 'undefined') {
                hasProp = true;
                standInFence[key] = fence[key];
              }
            }
          }
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
            retRx = new RegExp(FenceProcess.DEFAULT_FENCE_START.replace('{0}', Util.escapeRegex(fenceStart.start)));
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
            retRx = new RegExp(FenceProcess.DEFAULT_FENCE_END.replace('{0}', Util.escapeRegex(fenceEnd.end)));
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
  //#endregion getFenceOptions
  //#region getFenceKind
  /**
 * Gets a fence that it has has a start and end that can be used to
 * build a regular expression for processing fences in text.
 * @param kind The kind of fence to return
 */
  public static getFenceKind(kind: fenceKind): IOptFence | undefined {
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
  //#endregion getFenceKind
  //#endregion Public Static Methods
  //#endregion Public Methods
}
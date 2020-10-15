import { eKind } from '../enums/enumEKind';
import { eProcess } from '../enums/enumEProcess';
import { commentKind, fenceKind, triState, whiteSpLn } from "../enums/projectEnums";
import { IBiOpt, IBuildIncludeOpt, IOptFence } from "../interface/projectInterfaces";
import { Util } from "../util/Util";
import { lnEndOpt, splitByOpt, widthFlags } from "string-breaker";
import { getFenceKind, getFenceOptions } from "./defaultOptions";

/**
 * Handles Merging of Options
 */
export class MergeOptions {
  private currentOpt: IBuildIncludeOpt;
  private newOpt: IBiOpt;
  private hasOverride: boolean = false;

  /**
   * Default constructor
   * @param currentBiOpt Current internal Options
   * @param passedInOpt Current passed in options
   */
  constructor(currentBiOpt: IBuildIncludeOpt, passedInOpt: IBiOpt) {
    this.currentOpt = currentBiOpt;
    this.newOpt = passedInOpt;
    this.hasOverride = this.hasOverrideOpt();
  }

  /**
  * Merges Options together giving priority to `currentBiOpt`
  * @returns Returns `true` if there any options are merged; Otherwise, `false`
  */
  public isBiMergedOptions(): boolean {
    let hasOpt: boolean = false;
    hasOpt = this.isMergedAsJsString() || hasOpt;
    hasOpt = this.isMergedBiComments() || hasOpt;
    hasOpt = this.isMergedBiText() || hasOpt;
    hasOpt = this.isMergedBiBreakString() || hasOpt;
    hasOpt = this.isMergedBiFence() || hasOpt;
    hasOpt = this.isMergedVerbose() || hasOpt;
    return hasOpt;
  }

  private hasOverrideOpt(): boolean {
    let override: boolean = false;
    const hasOverride = this.newOpt.override;
    if (hasOverride && typeof hasOverride === 'boolean') {
      override = hasOverride;
    }
    return override;
  }

  private isMergedAsJsString(): boolean {
    let hasOpt: boolean = false;
    const asjs = this.newOpt.asJsString;
    if (typeof asjs === 'boolean') {
      if (this.newOpt.asJsString === false || this.hasOverride === true) {
        this.newOpt.asJsString = asjs;
        hasOpt = true;
      }
    }
    return hasOpt;
  }

  private isMergedBiComments(): boolean {
    const commet = this.newOpt.comment;
    let hasOpt: boolean = false;
    if (commet) {
      if ((this.currentOpt.comment.padLeftAssigned === false || this.hasOverride === true) && commet.padleft !== undefined) {
        this.currentOpt.comment.padLeft = commet.padleft;
        this.currentOpt.comment.padLeftAssigned = true;
        this.currentOpt.comment.isSet = true;
        hasOpt = true;
      }
      if ((this.currentOpt.comment.type === commentKind.none || this.hasOverride === true) && commet.type !== undefined) {
        this.currentOpt.comment.type = commentKind.parse(commet.type);
        if (this.currentOpt.comment.type > commentKind.none) {
          this.currentOpt.comment.isSet = true;
          hasOpt = true;
        }
      }
    }
    return hasOpt;
  }

  private isMergedBiText (): boolean {
    const txt = this.newOpt.text;
    let hasOpt: boolean = false;
    if (txt) {
      if (this.currentOpt.text.isSet === false || this.hasOverride === true) {
        //#region Command Functions
        const setAfter = (): boolean => {
          let result = false;
          if (txt.after !== undefined) {
            this.currentOpt.text.after = txt.after.toString();
            this.currentOpt.text.isSet = true;
            result = true;
          }
          return result;
        }
        const setBefore = (): boolean => {
          let result = false;
          if (txt.before !== undefined) {
            this.currentOpt.text.before = txt.before.toString();
            this.currentOpt.text.isSet = true;
            result = true;
          }
          return result;
        }
        const setCode = (): boolean => {
          let result = false;
          if (txt.code !== undefined) {
            this.currentOpt.text.code = eKind.parse(txt.code.toString());
            if (this.currentOpt.text.code > eKind.none) {
              this.currentOpt.text.isSet = true;
              result = true;
            }
          }
          return result;
        }
        const setCodeKind = (): boolean => {
          let result = false;
          if (txt.codekind !== undefined) {
            this.currentOpt.text.codeKind = eProcess.parse(txt.codekind.toString());
            if (this.currentOpt.text.codeKind > eProcess.none) {
              this.currentOpt.text.isSet = true;
              result = true;
            }
          }
          return result;
        }
        const setWhiteSpaceLine = (): boolean => {
          let result = false;
          if (txt.whiteSpaceLine !== undefined) {
            this.currentOpt.text.whiteSpaceLine = whiteSpLn.parse(txt.whiteSpaceLine.toString());
            if (this.currentOpt.text.whiteSpaceLine > whiteSpLn.noAction) {
              this.currentOpt.text.isSet = true;
              result = true;
            }
          }
          return result;
        }
        const setNoLineBreaks = (): boolean => {
          let result = false;
          if (txt.nolinebreaks !== undefined) {
            if (typeof txt.nolinebreaks === 'string') {
              let s: string = txt.nolinebreaks;
              s = s.toString().toLowerCase();
              if (s === 'true' || s === '1') {
                this.currentOpt.text.noLineBreaks = true;
                this.currentOpt.text.isSet = true;
                result = true;
              }
            } else if (typeof txt.nolinebreaks === 'boolean') {
              if (txt.nolinebreaks === true) {
                this.currentOpt.text.noLineBreaks = true;
                this.currentOpt.text.isSet = true;
                result = true;
              }
            }
          }
          return result;
        }
        const setIndent = (): boolean => {
          let result = false;
          if (txt.indent !== undefined) {
            if (typeof txt.indent === 'string') {
              let s: string = txt.indent;
              s = s.toString().toLowerCase();
              if (s === 'true' || s === '1') {
                this.currentOpt.text.indent = true;
                this.currentOpt.text.isSet = true;
                result = true;
              } else if (s === 'false' || s === '0') {
                this.currentOpt.text.indent = false;
                this.currentOpt.text.isSet = true;
                result = true;
              }
            } else if (typeof txt.indent === 'boolean') {
              this.currentOpt.text.indent = txt.indent;
              this.currentOpt.text.isSet = true;
              result = true;
            }
          }
          return result;
        }
        const setPadLeft = (): boolean => {
          let result = false;
          if (txt.padding !== undefined) {
            if (txt.padding.padleft !== undefined) {
              if (typeof txt.padding.padleft === 'number') {
                this.currentOpt.text.padding.padLeft = txt.padding.padleft;
              } else {
                this.currentOpt.text.padding.padLeft = txt.padding.padleft.toString();
              }
              this.currentOpt.text.padding.padLeftAssigned = true;
              this.currentOpt.text.isSet = true;
              result = true;
            }
          }
          return result;
        }

        const setPadRight = (): boolean => {
          let result = false;
          if (txt.padding !== undefined) {
            if (txt.padding.padright !== undefined) {
              if (typeof txt.padding.padright === 'number') {
                this.currentOpt.text.padding.padRight = txt.padding.padright;
              } else {
                this.currentOpt.text.padding.padRight = txt.padding.padright.toString();
              }
              this.currentOpt.text.padding.padRigtAssigned = true;
              this.currentOpt.text.isSet = true;
              result = true;
            }
          }
          return result;
        }
        //#endregion

        hasOpt = setAfter() || hasOpt;
        hasOpt = setBefore() || hasOpt;
        hasOpt = setCode() || hasOpt;
        hasOpt = setCodeKind() || hasOpt;
        hasOpt = setWhiteSpaceLine() || hasOpt;
        hasOpt = setNoLineBreaks() || hasOpt;
        hasOpt = setIndent() || hasOpt;
        hasOpt = setPadLeft() || hasOpt;
        hasOpt = setPadRight() || hasOpt;

        if ((typeof this.currentOpt.text.code === 'number' && this.currentOpt.text.code > eKind.none)
          && (typeof this.currentOpt.text.codeKind === 'number' && this.currentOpt.text.codeKind > eProcess.none)) {
          this.currentOpt.text.isCode = true;
        }
      }
    }
    return hasOpt;
  }
  
  private isMergedBiBreakString(): boolean {
    const bs = this.newOpt.breakstring;
    let hasOpt: boolean = false;
    if (bs) {
      if (this.currentOpt.bs.isSet === false || this.hasOverride === true) {
        if (typeof bs === 'number') {
          this.currentOpt.bs.width = Math.abs(Math.round(bs));
          this.currentOpt.bs.isSet = true;
          hasOpt = true;
        } else if (typeof bs === 'object') {
          //#region Object query Methods
          const getBreak = (): splitByOpt => {
            let result = this.currentOpt.bs.break;
            if (bs.break) {
              if (typeof bs.break === 'number') {
                // parse just in case not a correct number
                result = Util.ParseEnumSplitByOpt(bs.break);
              } else {
                result = Util.ParseEnumSplitByOpt(bs.break.toString());
              }
            }
            return result;
          }
          const getFlags = (): widthFlags => {
            let result = this.currentOpt.bs.flags
            if (bs.flags) {
              let v: string = bs.flags.toString();
              if (v.length > 0) {
                v = v.toLowerCase();
                if (v === 'word') {
                  result = widthFlags.nearestWord;
                }
              }
            }
            return result;
          }
          const getLineEnd = (): lnEndOpt => {
            let result = this.currentOpt.bs.lineEnd;
            if (bs.eol) {
              if (typeof bs.eol === 'number') {
                // parse just in case not a correct number
                result = Util.ParseEnumLnEndOpt(bs.eol);
              } else {
                result = Util.ParseEnumLnEndOpt(bs.eol.toString());
              }
            }
            return result;
          }
          const getWidth = (): number => {
            let result = this.currentOpt.bs.width;
            if (bs.width) {
              if (typeof bs.width === 'number') {
                result = Math.round(Math.abs(bs.width));
              } else {
                const num: number = parseInt(bs.width.toString(), 10);
                if (isNaN(num) === false) {
                  result = Math.round(Math.abs(num));
                }
              }
            }
            return result;
          }
          const getBefore = (): string => {
            let result = this.currentOpt.bs.before;
            if (bs.before) {
              result = bs.before.toString();
            }
            return result;
          }
          const getAfter = (): string => {
            let result = this.currentOpt.bs.after;
            if (bs.after) {
              result = bs.after.toString();
            }
            return result;
          }
          //#endregion
          //#region object command methods
          const setOptBreakString = (): void => {
            this.currentOpt.bs.break = getBreak();
            this.currentOpt.bs.flags = getFlags();
            this.currentOpt.bs.lineEnd = getLineEnd();
            this.currentOpt.bs.width = getWidth();
            this.currentOpt.bs.before = getBefore();
            this.currentOpt.bs.after = getAfter();
          }
          //#endregion
          setOptBreakString();
          this.currentOpt.bs.isSet = true;
          hasOpt = true;
        }
      }
    }
    return hasOpt;
  }

  private isMergedBiFence(): boolean {
    if (this.currentOpt.regexFence) {
      return false;
    }
    let hasOpt: boolean = false;
    const cFence = this.newOpt.fence;
    if (!cFence) {
      return false;
    }
    let maybeFence: IOptFence | undefined;
    if (typeof cFence === 'string' || typeof cFence === 'number') {
      this.currentOpt.fence.type = fenceKind.parse(cFence);
      maybeFence = getFenceKind(this.currentOpt.fence.type);
      if (maybeFence) {
        this.currentOpt.fence.start = maybeFence.start;
        this.currentOpt.fence.end = maybeFence.end;
        this.currentOpt.fence.remove = false;
      }
    } else if (typeof cFence === 'object') {
      if (cFence.hasOwnProperty('type')) {
        maybeFence = getFenceKind(this.currentOpt.fence.type);
        this.currentOpt.fence.type = cFence.type;
      }
      if (cFence.hasOwnProperty('start')) {
        this.currentOpt.fence.start = cFence.start;
      } else if (maybeFence) {
        this.currentOpt.fence.start = maybeFence.start;
      }
      if (cFence.hasOwnProperty('end')) {
        this.currentOpt.fence.end = cFence.end;
      } else if (maybeFence) {
        this.currentOpt.fence.end = maybeFence.end;
      }

      if (cFence.hasOwnProperty('remove')
        && typeof cFence.remove === 'boolean') {
        this.currentOpt.fence.remove = cFence.remove;
      } else {
        this.currentOpt.fence.remove = false;
      }
    }
    const reg: RegExp | undefined = getFenceOptions(this.newOpt.fence);
    if (reg) {
      if (this.currentOpt.regexFence === undefined || this.hasOverride === true) {
        hasOpt = true;
        this.currentOpt.regexFence = reg;
      }
    }
    return hasOpt;
  }

  private isMergedVerbose(): boolean {
    let hasOpt: boolean = false;
    const verbose = this.newOpt.verbose;
    if (typeof verbose === 'boolean') {
      if (this.currentOpt.verbose === triState.unset || this.hasOverride === true) {
        if (verbose === true) {
          this.currentOpt.verbose = triState.true;
        } else {
          this.currentOpt.verbose = triState.false;
        }
        hasOpt = true;
      }
    }
    return hasOpt;
  }
}
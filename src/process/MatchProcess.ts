import { EOL } from "os";
import { matchKind, whiteSpLn } from "../enums/projectEnums";
import { IBuildIncludeOpt, ILogger, IMatchItemWsItm, IMatchType } from "../interface/projectInterfaces";
import { MatchItem } from "../matches/MatchItem";
import { StringUtil } from "../util/StringUtil";
import { Util } from "../util/Util";
import { lnEndOpt, splitByOpt, stringBreaker } from "string-breaker";
import { BreakStringProcess } from "./BreakStringProcess";
import { CommentProcess } from "./CommentProcess";
import { CommonProcess } from "./CommonProcess";
import { Process } from "./Process";

export class MatchProcess extends Process {
  private breakStringProcess: BreakStringProcess;
  private commentProcess: CommentProcess;
  private commonProcess: CommonProcess;

  constructor() {
    super();
    this.breakStringProcess = new BreakStringProcess();
    this.commentProcess = new CommentProcess();
    this.commonProcess = new CommonProcess();
  }

  public registerLoggerEvents(loggerEvent: ILogger) {
    super.registerLoggerEvents(loggerEvent);
    this.breakStringProcess.registerLoggerEvents(loggerEvent);
    this.commentProcess.registerLoggerEvents(loggerEvent);
    this.commonProcess.registerLoggerEvents(loggerEvent);
  }

  //#region processMatch
  /**
   * Processes a build_include ( or variation of ) match and applies any options.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @param fileContent The contents of the current replacement file
   * @returns The filecontent with all build_include options applied
   */
  public processMatch(biOpt: IBuildIncludeOpt, matches: Array<IMatchType>): string {
    //#region  internal Methods
    const processCommentBreakStrings = (segment: string) => {
      // only break for comment if breakstring options are not set
      // otherwise allow the breakstring options to break the string.
      if (biOpt.comment.isSet === true && biOpt.bs.isSet === false) {
        // only split fileContent into array if not yet split
        if (biOpt.lines.length === 0) {
          biOpt.lines = stringBreaker(this.breakStringProcess.breakStringBeforeAfter(segment, biOpt),
            {
              lnEnd: lnEndOpt.noLnBr,
              splitOpt: splitByOpt.line,
              lenOpt: biOpt.bs.flags
            });
        }
      }
    };

    const processBreakstringToLinesIfNotDone = (segment: string) => {
      // break string is set. time to break fileContent into lines
      if (biOpt.bs.isSet === true) {
        // only split fileContent into array if not yet split
        if (biOpt.lines.length === 0) {
          // if encoding as javascript string then width will be width -1 to accomidate
          // enscaped line chars \
          biOpt.lines = stringBreaker(this.breakStringProcess.breakStringBeforeAfter(segment, biOpt),
            {
              width: biOpt.asJsString ? biOpt.bs.width - 1 : biOpt.bs.width,
              lnEnd: biOpt.bs.lineEnd,
              splitOpt: biOpt.bs.break,
              lenOpt: biOpt.bs.flags
            });
        }
      } // if (biOpt.bs.isSet === true)
    }

    const getContentProcessedAsSingleLine = (segment: string): string => {
      let result = '';
      // if noLinBreaks is true then we have a single line
      if (biOpt.text.padding.padLeftAssigned === true) {
        result = StringUtil.padLeft(segment, biOpt.text.padding.padLeft);
      }
      if (biOpt.text.padding.padRigtAssigned === true) {
        result = StringUtil.padLeft(segment, biOpt.text.padding.padRight);
      }
      return result;
    }

    const getLinesWithBreaksStringDefault = (segment: string) => {
      return stringBreaker(segment, {
        splitOpt: splitByOpt.line,
        lenOpt: biOpt.bs.flags
      });
    }

    const getLines = (): string[] => {
      const strLines: string[] = []
      // it is possible the matches contain a lot of empty
      // lines. This espically can happen if fencing is to remove
      // and there was a number of fences in a row.
      let mA: Array<IMatchType>;
      if (biOpt.text.isSet === true && biOpt.text.whiteSpaceLine > whiteSpLn.noAction) {
        mA = this.getProcessedForWhiteSpLns(biOpt, matches);
      } else {
        mA = matches;
      }
      mA.forEach(mt => {
        if (mt.kind === matchKind.fence) {
          strLines.push(mt.value);
        } else if (mt.kind === matchKind.normal) {
          let content: string = '';
          const segment: string = mt.value;

          processCommentBreakStrings(segment);
          processBreakstringToLinesIfNotDone(segment);

          if (biOpt.comment.isSet === true) {
            biOpt.lines = this.commentProcess.processComment(biOpt);
            content = this.breakStringProcess.buildBreakStringNormal(biOpt);
          } else if (biOpt.bs.isSet === true) {
            biOpt.lines = this.breakStringProcess.buildBreakString(biOpt);
            content = this.breakStringProcess.buildBreakStringNormal(biOpt);
          } else if (biOpt.lines.length > 0) {
            biOpt.lines = this.commonProcess.buildStringPreSuf(biOpt);
            content = this.breakStringProcess.buildBreakStringNormal(biOpt);
          } else {
            if (biOpt.text.noLineBreaks === true) {
              content = getContentProcessedAsSingleLine(segment);
            } else {
              // at this point we may have multi line fileContent
              // lets break by line and process simpple
              biOpt.lines = getLinesWithBreaksStringDefault(segment);
              biOpt.lines = this.commonProcess.buildStringPreSuf(biOpt);
              content = this.breakStringProcess.buildBreakStringNormal(biOpt);
            }
          }
          strLines.push(content);
          biOpt.lines = [];
        }
      });
      return strLines;
    }

    const processCommentFinal = () => {
      if (biOpt.comment.isSet) {
        biOpt.lines = strA;
        this.commentProcess.processCommentFinal(biOpt);
        strA = biOpt.lines;
        biOpt.lines = [];
      }
    }
    //#endregion Internal methods

    let strA: string[] = getLines();
    biOpt.lines = [];
    processCommentFinal();
    return strA.join(EOL);
  }
  //#endregion processMatch

  //#region  processMatchItem
  /**
     * Processses a item of [[IMatchType]] and filters white space.
     * @param mt Current MatchItem to filter
     * @param lineOpt What filtering to apply.
     * @See [[processWhiteSpLns]]
     */
  private processMatchItem(mt: IMatchType, lineOpt: whiteSpLn): IMatchItemWsItm {
    let result: IMatchItemWsItm = {
      lines: [],
      countEnd: 0,
      countStart: 0,
      kind: mt.kind
    };
    const newLines: string[] = [];
    if (mt.value.length === 0) {
      return result;
    }
    let startEmpty: number = 0;
    let endEmpty: number = 0;
    let startDone: boolean = false;
    let isEmpty: boolean = false;
    const lines: string[] = stringBreaker(mt.value, { splitOpt: splitByOpt.line });
    //#region Internal Switch Processors
    const processTwoEmptyLn = (ln: string) => {
      if (ln.length === 0) {
        isEmpty = true;
      } else {
        newLines.push(ln);
        isEmpty = false
        endEmpty = 0;
        startDone = true;
      }
      if (isEmpty === true) {
        if (startDone === false) {
          if (startEmpty < 1) {
            newLines.push(ln);
            startEmpty++
          }
        } else {
          if (endEmpty < 1) {
            newLines.push(ln);
            endEmpty++;
          }
        }
      }
    };
    const processNoTwoWsLn = (ln: string) => {
      if (Util.isEmptyOrWhiteSpace(ln) === true) {
        isEmpty = true;
      } else {
        newLines.push(ln);
        isEmpty = false
        endEmpty = 0;
        startDone = true;
      }
      if (isEmpty === true) {
        if (startDone === false) {
          if (startEmpty < 1) {
            newLines.push(ln);
            startEmpty++
          }
        } else {
          if (endEmpty < 1) {
            newLines.push(ln);
            endEmpty++;
          }
        }
      }
    };
    //#endregion Internal Switch Processors
    lines.forEach(ln => {
      switch (lineOpt) {
        case whiteSpLn.noTwoEmptyLn:
          processTwoEmptyLn(ln);
          break;
        case whiteSpLn.noTwoWsLn:
          processNoTwoWsLn(ln);
          break;
        case whiteSpLn.removeAllEmpty:
          if (ln.length > 0) {
            newLines.push(ln);
          }
          break;
        case whiteSpLn.removeAllWs:
          if (Util.isEmptyOrWhiteSpace(ln) === false) {
            newLines.push(ln);
          }
          break;
        default:
          newLines.push(ln);
          break;
      }
    });
    result = {
      lines: newLines,
      countEnd: endEmpty,
      countStart: startEmpty,
      kind: mt.kind
    };

    return result;
  }
  //#endregion processMatchItem

  //#region getProcessedForWhiteSpLns
  /**
     * Processes `matches` and returns an array with lines ommited based upon
     * [[IBuildIncludeOpt.text]] [[IText.noLineBreaks]] setting
     * @param biOpt The arguments from the options string values
     * The type of string nreaking will be terminde by args.asJsString
     * @param matches Array of matches
     * @returns New array of [[IMatchType]] filtered by any white space settings.
     */
  private getProcessedForWhiteSpLns(biOpt: IBuildIncludeOpt, matches: Array<IMatchType>): Array<IMatchType> {
    if (matches.length === 0) {
      return [];
    }
    const result: Array<IMatchType> = [];
    const lineOpt = biOpt.text.whiteSpaceLine;
    const items: Array<IMatchItemWsItm> = [];
    matches.forEach(mt => {
      const pMI = this.processMatchItem(mt, lineOpt);
      items.push(pMI);
    });
    // now that all of the matched items are processed
    // filter out all of the lines that are breaking the rules
    let prevItem: IMatchItemWsItm | undefined;
    //#region Internal Methods
    const getProcessNoTwoWhiteSpaceLines = (item: IMatchItemWsItm) => {
      const arr: Array<IMatchType> = [];
      if (prevItem !== undefined) {
        // countStart or countEnd cannot be > 1 for any item at this point.
        if (prevItem.countEnd > 0) {
          if (item.countStart > 0) {
            // remove empty lines as needed
            while (item.countStart > 0) {
              item.lines.shift();
              item.countStart--;
            }
          }
        } else if (item.countStart > 1) {
          while (item.countStart > 1) {
            item.lines.shift();
            item.countStart--;
          }
        }
      } else {
        if (item.countStart > 1) {
          while (item.countStart > 1) {
            item.lines.shift();
            item.countStart--;
          }
        }
      }
      if (item.lines.length > 0) {
        arr.push(MatchItem.FromMatchItemWsItm(item));
      }
      return arr;
    };
    //#endregion Internal Methods
    items.forEach(item => {
      switch (lineOpt) {
        case whiteSpLn.noTwoEmptyLn:
        case whiteSpLn.noTwoWsLn:
          result.push(...getProcessNoTwoWhiteSpaceLines(item));
          break;
        case whiteSpLn.removeAllEmpty:
        case whiteSpLn.removeAllWs:
          if (item.lines.length > 0) {
            result.push(MatchItem.FromMatchItemWsItm(item));
          }
          break;
        default:
          result.push(MatchItem.FromMatchItemWsItm(item));
          break;
      }
      if (item.lines.length > 0) {
        // prevItem will act as last added item
        prevItem = Util.deepCopy(item);
      }
    });
    return result;
  }
  //#endregion getProcessedForWhiteSpLns
}
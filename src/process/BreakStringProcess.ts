import { EOL } from "os";
import { IBuildIncludeOpt, ILogger } from "../interface/projectInterfaces";
import { ArgsUtil } from "../util/ArgsUtil";
import { StringUtil } from "../util/StringUtil";
import { Util } from "../util/Util";
import { lnEndOpt, splitByOpt, stringBreaker, widthFlags } from "string-breaker";
import { CommonProcess } from "./CommonProcess";
import { Process } from "./Process";

export class BreakStringProcess extends Process {
  private commonProcess: CommonProcess;
  constructor() {
    super();
    this.commonProcess = new CommonProcess();
  }

  public registerLoggerEvents(loggerEvent: ILogger) {
    super.registerLoggerEvents(loggerEvent);
    this.commonProcess.registerLoggerEvents(loggerEvent);
  }
  //#region breakStringBeforeAfter
  /**
   * Appends Before and After to breakstring if they are set.
   * @param strInput input string
   * @param biOpt The arguments from the options string values
   * @returns strInput wrapend in before and after.
   */
  public breakStringBeforeAfter(strInput: string, biOpt: IBuildIncludeOpt): string {

    let result = biOpt.bs.before;
    result += strInput;
    result += biOpt.bs.after;
    return result;
  }
  //#endregion breakStringBeforeAfter

  //#region buildBreakString
  /**
   * Breaks a string into lines by Javascript or regular breaks
   * @param biOpt The arguments from the options string values
   * The type of string nreaking will be terminde by args.asJsString
   */
  public buildBreakString(biOpt: IBuildIncludeOpt): string[] {
    if (biOpt.asJsString) {
      return this.buildBreakStringJs(biOpt);
    } else {
      return this.commonProcess.buildStringPreSuf(biOpt);
    }
  };
  // #endregion

  //#region buildBreakStringJs
  /**
   * Builds a muli-line javascript string that has no padding before each line start.  
   * Padding can be applied after each line start and after each line.
   * @param biOpt TThe current options. This parameter is an object and
   * will be potentially modified by this method.
   *
   * The returning string will have line ending escaped using \
   * The lines are built from hte  args.lines value
   */
  private buildBreakStringJs(biOpt: IBuildIncludeOpt): string[] {
    const result: string[] = [];
    if (biOpt.lines.length === 0) {
      return result;
    }
    const strPrefix: string = StringUtil.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = StringUtil.getPadding(biOpt.text.padding.padRight);
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    let isIndent: boolean = false;
    let indent: string = '';
    result.push('\\');
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
    }
    //#region Internal Methods
    const getLinesSplitByEol = () => {
      const strArr: string[] = [];
      let str = '';
      for (const line of biOpt.lines) {
        // break line into string array based upon line and add each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        for (const inLine of sTmp) {
          str = strPrefix + inLine + strSuffix + '\\';
          if (isIndent === true) {
            str = indent + str;
          }
          strArr.push(str);
        }
      }
      return strArr;
    };
    const getLinesSplit = () => {
      const strArr: string[] = [];
      let str = '';
      for (const line of biOpt.lines) {
        str = strPrefix + line + strSuffix + '\\';
        if (isIndent === true) {
          str = indent + str
        }
        strArr.push(str);
      }
      return strArr;
    };
    //#endregion Internal Methods

    if (splitEol === true) {
      result.push(...getLinesSplitByEol());
    } else {
      result.push(...getLinesSplit());
    } // if (splitEol === true)
    if (result.length > 0) {
      let lastLn: string | undefined = result.pop();
      if (lastLn !== undefined) {
        if ((lastLn.length - 1) < biOpt.bs.width) {
          // remove last escape \
          lastLn = lastLn.substring(0, lastLn.length - 1);
          result.push(lastLn);
        } else {
          result.push(lastLn);
        }
      } else {
        // in theory this should never happen
        // but typscript forces .pop() to possibley be undefined
        result.push('');
      }
    }
    return result;
  };
  // #endregion

  //#region buildBreakStringNormal
  /**
   * Builds a string into a multi-line string with each line seperated by \n
   * @param biOpt The arguments from the options string values
   *
   * The lines are built from the  args.lines value.
   *
   * No padding is applied in this process
   */
  public buildBreakStringNormal(biOpt: IBuildIncludeOpt): string {
    return biOpt.lines.join(EOL);
  };
  //#endregion

  //  #region isOptionBreakStringSet
  /**
   * Checks opts for breakstring options and assigns any found options to biOpt
   * @description
   * Potential options are as follows.
   *
   * Sets options for [biOpt.bs]{@link IBuildIncludeOpt.bs}
   * 
   * [[include:docs/BuildProcess/getOptionsBreakString.md]]
   *
   * @param opts The array of options to search for break string options in
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns true if opts has break string options; Otherwise, false.
   * @see [string-breaker]{@link https://amourspirit.github.io/node-string-breaker/index.html}
   * @example
  ```js
  
  // BUILD_INCLUDE('../myfile.txt')[breakstring?width=100&eol=encode]
  // BUILD_INCLUDE('../myjavascript.js')[breakstring?break=line]
  ```
   */
  public isOptionBreakStringSet(opts: string[], biOpt: IBuildIncludeOpt): boolean {
    //#region Internal Methods
    const processOption = (args: string[]) => {
      let v: string;
      const key = args[0].toLowerCase();
      switch (key) {
        case 'width':
          if (args.length === 2) {
            v = args[1];
            v = v.trim();
            if (v.length > 0) {
              const iBsWidth: number = parseInt(v, 10);
              if (isNaN(iBsWidth) === false) {
                biOpt.bs.width = Math.abs(iBsWidth);
              }
            }
          }
          break;
        case 'flags':
          if (args.length === 2) {
            v = args[1];
            v = v.trim();
            if (v.length > 0) {
              v = v.toLowerCase();
              if (v === 'word') {
                biOpt.bs.flags = widthFlags.nearestWord;
              }
            }
          }
          break;
        case 'eol':
          if (args.length === 2) {
            biOpt.bs.lineEnd = Util.parseEnumLnEndOpt(args[1]);
          }
          break;
        case 'break':
          if (args.length === 2) {
            biOpt.bs.break = Util.parseEnumSplitByOpt(args[1]);
          }
          break;
        case 'before':
          if (args.length === 2) {
            biOpt.bs.before = args[1];
          }
          break;
        case 'after':
          if (args.length === 2) {
            biOpt.bs.after = args[1];
          }
          break;
        default:
          break;
      }
    };
    //#endregion Internal Methods

    const rxBreakString: RegExp = /\s*(breakstring(\?.*)?\s*)/i;
    if (
      opts.some(option => {
        if (rxBreakString.test(option)) {
          let cMatch: RegExpExecArray | null;
          cMatch = rxBreakString.exec(option);
          if (cMatch) {
            // it is irrelevant if any options are set.
            // string can be split by default options
            // haveing breakstring in options is enough
            // without any parameters.
            biOpt.bs.isSet = true;
          }
          if (cMatch && cMatch[2]) {
            const opt = ArgsUtil.splitArgsAnd(cMatch[2]);
            opt.some(kv => {
              const eqArgs = ArgsUtil.splitArgsEq(kv);
              // must be a length of 1 or two
              if (eqArgs.length === 0 || eqArgs.length > 2) {
                return false;
              }
              processOption(eqArgs);
              return false;
            });
          }
          return biOpt.bs.isSet;
        }
        return biOpt.bs.isSet;
      })
    ) {
      this.logger.verbose.writeln('Break String options set: ', Util.keyValueToString(biOpt.bs));
      return true;
    }
    return false;
  }
	//  #endregion
}
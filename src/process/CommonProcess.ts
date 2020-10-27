import { IBuildIncludeOpt } from "../interface/projectInterfaces";
import { StringUtil } from "../util/StringUtil";
import { lnEndOpt, splitByOpt, stringBreaker } from "string-breaker";
import { Process } from "./Process";

export class CommonProcess extends Process {

  //  #region buildStringPreSuf
  /**
   * Builds a string into a multi-line string with each line seperated by \n
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   *
   * If args.text.padLeft is set it will be applied at the start of each line.
   * 
   * If args.text.padRight is set it will be applied at the end of each line.
   *
   * The lines are built from the  args.lines value.
   */
  public buildStringPreSuf(biOpt: IBuildIncludeOpt): string[] {
    const result: string[] = [];
    const strPrefix: string = StringUtil.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = StringUtil.getPadding(biOpt.text.padding.padRight);
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    let isIndent: boolean = false;
    let indent: string = '';
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
          str = strPrefix + inLine + strSuffix;
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
        str = strPrefix + line + strSuffix;
        if (isIndent === true) {
          str = indent + str;
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
    }
    return result;
  };
	// #endregion

}
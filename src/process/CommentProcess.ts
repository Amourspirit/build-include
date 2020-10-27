import { lnEndOpt, splitByOpt, stringBreaker } from "string-breaker";
import { commentKind } from "../enums/projectEnums";
import { ArgsUtil } from "../util/ArgsUtil";
import { Util } from "../util/Util";
import { IBuildIncludeOpt } from "../interface/projectInterfaces";
import { StringUtil } from "../util/StringUtil";
import { Process } from "./Process";

export class CommentProcess extends Process {
  constructor() {
    super();
  }


  //#region getCommentHtmlLines
  /**
   * Generates an array with the body of content for a html comment.  
   * applies Padding as follows:
   * [[IComment.padLeft]] is applied to the beginning of each line
   *  
   * [[IPadding.padLeft]] is applied before comment
   * 
   * [[IPadding.padRight]] is applied after comment
   * 
   * Indent is appled to the start if each line if indenting is enabled.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @see [[commentHtmlFinal]]
   */
  private getCommentHtmlLines(biOpt: IBuildIncludeOpt): string[] {
    if (biOpt.lines.length === 0) {
      return [];
    }
    // if encoded using breakstring?eol=none
    // then elements may contain line breaks and should be split for such a case
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    const strPad: string = StringUtil.getPadding(biOpt.comment.padLeft);
    const strPrefix: string = StringUtil.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = StringUtil.getPadding(biOpt.text.padding.padRight);
    const result: string[] = [];
    let isIndent: boolean = false;
    let indent: string = '';
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
    }
    //#region Internal Methods
    const getSplitByEol = () => {
      const strArr: string[] = [];
      let str = '';
      for (const line of biOpt.lines) {
        // break line into string array based upon line and add each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        for (const inLine of sTmp) {
          str = strPad + strPrefix + inLine + strSuffix;
          if (isIndent === true) {
            str = indent + str;
          }
          strArr.push(str);
        }
      }
      return strArr;
    };
    const getSplitBy = () => {
      const strArr: string[] = [];
      let str = '';
      for (const line of biOpt.lines) {
        str = strPad + strPrefix + line + strSuffix;
        if (isIndent === true) {
          str = indent + str;
        }
        strArr.push(str);
      }
      return strArr;
    }
    //#endregion Internal Methods

    if (splitEol === true) {
      result.push(...getSplitByEol());
    } else {
      result.push(...getSplitBy());
    }
    if (result.length === 1) {
      biOpt.opt.htmlMulti = 'y';
    } else {
      biOpt.opt.htmlMulti = 'n';
    }
    return result;
  };
  //  #endregion

  //#region getCommentJsAutoLines
  /**
   * Determins if the lines passed in var biOpt are formated
   * as multi-line coments or single-line comments
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @see [[commentJsAutoFinal]]
   */
  private getCommentJsAutoLines(biOpt: IBuildIncludeOpt): string[] {
    // if encoded using breakstring?eol=none
    // then elements may contain line breaks and should be split for such a case
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    let multi: boolean = biOpt.lines.length > 1;
    if (splitEol === true && multi === false) {
      for (const line of biOpt.lines) {
        // break line into string array based upon line and test each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        if (sTmp.length > 1) {
          multi = true;
          break;
        }
      }
    }
    if (multi === true) {
      biOpt.opt.jsAutoType = 'm';
      return this.getCommentMultiLines(biOpt);
    }
    biOpt.opt.jsAutoType = 's';
    return this.getCommentSingleLines(biOpt);
  }
  //  #endregion

  //  #region getCommentMultiLines
  /**
   * Builds a string array of lines with multiline comments
   * for the body of a multiline style or JsDoc style.
   * 
   * [[IComment.padLeft]] is applied to the beginning of each line
   *
   * [[IPadding.padLeft]] is applied before comment
   *
   * [[IPadding.padRight]] is applied after comment
   *
   * Each line in the array is prefixed with `*` and depending on the paddind space(s) on each side.
   * Indent is appled to the start if each line if indenting is enabled.
   * @param biOpt The current options.
   * This parameter is an object and will be potentially modified by this method.
   * @see [[commentMultiFinal]]
   */
  private getCommentMultiLines(biOpt: IBuildIncludeOpt): string[] {
    if (biOpt.lines.length === 0) {
      return [];
    }
    // if encoded using breakstring?eol=none
    // then elements may contain line breaks and should be split for such a case
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    const strPad: string = StringUtil.getPadding(biOpt.comment.padLeft);
    const strPrefix: string = StringUtil.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = StringUtil.getPadding(biOpt.text.padding.padRight);
    let isIndent: boolean = false;
    let indent: string = '';
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
    }
    const result: string[] = [];
    let cmtSep: string = ' *';

    if (biOpt.text.padding.padLeftAssigned === false) {
      // text padding is excluded then add a single space
      cmtSep += ' ';
    }
    //#region  internal methods
    const getSplitByEol = () => {
      const strArr: string[] = [];
      let str = '';
      for (const line of biOpt.lines) {
        // break line into string array based upon line and add each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        for (const inLine of sTmp) {
          str = strPad + cmtSep + strPrefix + inLine + strSuffix;
          if (isIndent === true) {
            str = indent + str;
          }
          strArr.push(str);
        }
      }
      return strArr;
    };
    const getSplitBy = () => {
      const strArr: string[] = [];
      let str = '';
      for (const line of biOpt.lines) {
        str = strPad + cmtSep + strPrefix + line + strSuffix;
        if (isIndent === true) {
          str = indent + str;
        }
        strArr.push(str);
      }
      return strArr;
    };
    //#endregion internal methods
    if (splitEol === true) {
      result.push(...getSplitByEol());
    } else {
      result.push(...getSplitBy());
    } // if (splitEol === true)
    return result;
  };
  //  #endregion

  //  #region getCommentSingleLines
  /**
   * Builds a string array of lines with single line comments
   * @param biOpt The arguments from the options string values.
   *
   * If args.comment.padLeft is set it will be applied before * for each line of the comment.
   *
   * If args.text.padLeft is set it will be applied after * but before each line of the comment.
   *
   * If args.text.padRight is set it will be applied after each line of the comment.
   */
  private getCommentSingleLines(biOpt: IBuildIncludeOpt): string[] {
    if (biOpt.lines.length === 0) {
      return [];
    }
    // if encoded using breakstring?eol=none
    // then elements may contain line breaks and should be split for such a case
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    const strPad: string = StringUtil.getPadding(biOpt.comment.padLeft);

    const strPrefix: string = StringUtil.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = StringUtil.getPadding(biOpt.text.padding.padRight);
    let isIndent: boolean = false;
    let indent: string = '';
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
    }
    let cmtSep: string;
    switch (biOpt.comment.type) {
      case commentKind.pound:
        cmtSep = '#';
        break;
      case commentKind.singleAsterisk:
        cmtSep = '*';
        break;
      default:
        cmtSep = '//';
        break;
    }
    if (biOpt.text.padding.padLeftAssigned === false) {
      // text padding is excluded then add a single space
      cmtSep += ' ';
    }

    //#region Internal Methods
    const getSplitByEol = () => {
      const strArr: string[] = [];
      let str = '';
      for (const line of biOpt.lines) {
        // break line into string array based upon line and add each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        for (const inLine of sTmp) {
          str = strPad + cmtSep + strPrefix + inLine + strSuffix;
          if (isIndent === true) {
            str = indent + str;
          }
          strArr.push(str);
        }
      }
      return strArr;
    };

    const getSplitBy = () => {
      const strArr: string[] = [];
      let str = '';
      for (const line of biOpt.lines) {
        str = strPad + cmtSep + strPrefix + line + strSuffix;
        if (isIndent === true) {
          str = indent + str;
        }
        strArr.push(str);
      }
      return strArr;
    };
    //#endregion Internal methods
    const result: string[] = [];
    if (splitEol === true) {
      result.push(...getSplitByEol());
    } else {
      result.push(...getSplitBy());
    } // if (splitEol === true)
    return result;
  };
  //  #endregion

  //#region commentMultiFinal
  /**
   * Appends multi comment marks before and after the biOpt.lines
   * @param biOpt The current options.
   * This parameter is an object and will be potentially modified by this method.
   * @see [[commentMulti]]
   */
  private commentMultiFinal(biOpt: IBuildIncludeOpt): void {
    let isIndent: boolean = false;
    let indent: string = '';
    const strPad: string = StringUtil.getPadding(biOpt.comment.padLeft);
    let newStr: string = strPad + '/*';
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
      newStr = indent + newStr;
    }
    if (biOpt.comment.type === commentKind.jsdoc) {
      // jsDoc
      newStr += '*';
    }
    biOpt.lines.unshift(newStr);
    if (isIndent === true) {
      newStr = indent + strPad + ' */';
    } else {
      newStr = strPad + ' */';
    }
    biOpt.lines.push(newStr);
  }
  //  #endregion

  //#region commentJsAutoFinal
  /**
     * Appends multi comment marks before and after the biOpt.lines if needed.
     * @param biOpt The current options. This parameter is an object and
     * will be potentially modified by this method.
     * @see [[commentJsAuto]]
     */
  private commentJsAutoFinal(biOpt: IBuildIncludeOpt): void {
    let multi: boolean = false;
    // see commentJsAuto
    if (biOpt.opt.hasOwnProperty('jsAutoType') === true && biOpt.opt.jsAutoType === 'm') {
      multi = true;
    }
    if (multi === true) {
      this.commentMultiFinal(biOpt);
    }
  }
  //#endregion commentJsAutoFinal

  //#region commentHtmlFinal
  /**
   * Wraps the results of [[commentHtml]] in html comments marks.
   * 
   * If there is a single line of comments then that line will have a prefix of
   * `<!--` and a suffix of `-->`.
   * 
   * If there are multiple lines then `<!--` will be the the first line and
   * `-->` will be the last line.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @see [[commentHtml]]
   */
  private commentHtmlFinal(biOpt: IBuildIncludeOpt): void {
    if (biOpt.lines.length === 0) {
      return
    }
    const prefix: string = '<!--';
    const suffix: string = '-->';
    // see commentHtml to see where biOpt.opt.htmlMulti is set.
    if (biOpt.opt.hasOwnProperty('htmlMulti') === true && biOpt.opt.htmlMulti === 'y') {
      biOpt.lines[0] = prefix + ' ' + biOpt.lines[0] + ' ' + suffix;
    } else {
      biOpt.lines.unshift(prefix);
      biOpt.lines.push(suffix);
    }
  }
  //  #endregion

  //  #region isOptionCommentSet
  /**
   * Checks opts for comment options and assigns any found options to biOpt
   * @description
   * Potential options are as follows.
   *
   * Sets options for [biOpt.comment]{@link IBuildIncludeOpt.comment}
   *
   * [[include:docs/BuildProcess/getOptionsComment.md]]
   * 
   * @param opts The array of options to search for comment options in
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns true if opts has comment options; Otherwise, false.
   */
  public isOptionCommentSet(opts: string[], biOpt: IBuildIncludeOpt): boolean {
    //#region Internal Methods
    const processOption = (args: string[]) => {
      const key = args[0].toLowerCase();
      switch (key) {
        case 'type':
          if (args.length === 2) {
            biOpt.comment.type = commentKind.parse(args[1]);
          }
          break;
        case 'padleft':
          if (args.length === 2) {
            if (StringUtil.isValidPadding(args[1])) {
              biOpt.comment.padLeftAssigned = true;
              biOpt.comment.padLeft = this.decodeParam(args[1]);
            }
            biOpt.comment.padLeft = this.decodeParam(args[1]);
          }
          break;
        default:
          break;
      }
    };
    //#endregion Internal Methods
    const rxComment: RegExp = /\s*(comment(\?.*)?\s*)/i;
    if (
      opts.some(option => {
        if (rxComment.test(option)) {
          let cMatch: RegExpExecArray | null;
          cMatch = rxComment.exec(option);
          if (cMatch) {
            // it is irrelevant if any options are set.
            // comments can be applied with default options
            biOpt.comment.isSet = true;
          }
          if (cMatch && cMatch[2]) {
            // get array of strings in format of name=value or name
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
          return biOpt.comment.isSet;
        }
        return biOpt.comment.isSet;
      })
    ) {
      this.logger.verbose.write('Comment options set: ');
      this.logger.verbose.writeln(Util.keyValueToString(biOpt.comment));
      return true;
    }
    return false;
  }
  //  #endregion

  //#region method  processComment
  /**
   * Process any comments that are in the current biOpt.Lines and returns
   * an string array of processed lines.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns a string[] of comment processed lines.
   * @see [[processCommentFinal]]
   */
  public processComment(biOpt: IBuildIncludeOpt): string[] {
    let result: string[] = [];
    if (biOpt.comment.isSet === true) {
      switch (biOpt.comment.type) {
        case commentKind.single:
        case commentKind.pound:
        case commentKind.singleAsterisk:
          result = this.getCommentSingleLines(biOpt);
          break;
        case commentKind.multi:
        case commentKind.jsdoc:
          result = this.getCommentMultiLines(biOpt);
          break;
        case commentKind.html:
          result = this.getCommentHtmlLines(biOpt);
          break;
        case commentKind.jsAuto:
          result = this.getCommentJsAutoLines(biOpt);
          break;
        default:
          // if not a proper kind the return content
          result = biOpt.lines;
          break;
      }
    }
    return result;
  }
  //  #endregion

  //#region method processCommentFinal
  /**
   * Depending on the type of comment this method will modify biOpt
   * to put comment marks at the start and end of biOpt.lines
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @see [[processComment]]
   */
  public processCommentFinal(biOpt: IBuildIncludeOpt): void {
    if (biOpt.comment.isSet === true) {
      switch (biOpt.comment.type) {
        case commentKind.multi:
        case commentKind.jsdoc:
          this.commentMultiFinal(biOpt);
          break;
        case commentKind.html:
          this.commentHtmlFinal(biOpt);
          break;
        case commentKind.jsAuto:
          this.commentJsAutoFinal(biOpt);
          break;
        default:
          break;
      }
    }
  }
	//#endregion

  //  #region decodeParam
  /**
   * Decodes string such as \u2014 to —
   * @description
   * Parameters are read from files with a BUILD_INCLDDE comment.
   * Since the content is read from a file any inline javascript escapes
   * are not automatically converted.  
   * This method does such conversions.
   * Unescaps any`\\` to `\` escaped colons.  
   * For Example:
   * 
  * ```js
  * // BUILD_INCLDDE(./somfile.txt)[text?before=\n&padleft=# \u2014]
  * ```
   *
   * This method decodes the unicode, line breaks and other JavaScript encodings.
   * This converts \n into an acutal new line and \u2014 into an em dash.
   * @param str string to decode
   */
  private decodeParam(str: string): string {
    const result = ArgsUtil.decodeParam(str);
    if (result.error) {
      this.logger.verbose.write('Error decoding parameter str of decodeParam with value of: ');
      this.logger.verbose.write(str);
      this.logger.verbose.write(' Error: ');
      if (result.error instanceof Error) {
        this.logger.verbose.writeln(result.error.message);
      } else if (typeof result.error === 'string') {
        this.logger.verbose.writeln(result.error);
      } else {
        this.logger.verbose.writeln('Unknown error');
      }
    }
    return result.decoded;
  };
	//  #endregion
}
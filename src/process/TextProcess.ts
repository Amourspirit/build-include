import { eKind } from "../enums/enumEKind";
import { eProcess } from "../enums/enumEProcess";
import { whiteSpLn } from "../enums/projectEnums";
import { IBuildIncludeOpt } from "../interface/projectInterfaces";
import { ArgsUtil } from "../util/ArgsUtil";
import { StringUtil } from "../util/StringUtil";
import { Util } from "../util/Util";
import { Process } from "./Process";

export class TextProcess extends Process {

  //  #region isOptionTextSet
  /**
   * Checks opts for text options and assigns any found options to biOpt
   * @description
   * Potential options are as follows.
   *
   * Sets options for [biOpt.text]{@link IBuildIncludeOpt.text}
   *
   * [[include:docs/BuildProcess/getOptionsText.md]]
   * 
   * @param opts The array of options to search for Text options in
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns true if opts has text options; Otherwise, false.
   * @example
  ```js
  
  // BUILD_INCLUDE('../myjavascript.js')[text?padleft=10&before=// injected from file\n&code=jsString]
  ```
   */
  public isOptionTextSet(opts: string[], biOpt: IBuildIncludeOpt): boolean {
    //#region Internal Methods
    const processOption = (args: string[]) => {
      let result = false;
      const key = args[0].toLowerCase();
      let v: string;
      switch (key) {
        case 'padleft':
          if (args.length === 2) {
            if (StringUtil.isValidPadding(args[1])) {
              result = true;
              biOpt.text.padding.padLeftAssigned = true;
              biOpt.text.padding.padLeft = this.decodeParam(args[1]);
            }
          }
          break;
        case 'padright':
          if (args.length === 2) {
            if (StringUtil.isValidPadding(args[1])) {
              result = true;
              biOpt.text.padding.padRigtAssigned = true;
              biOpt.text.padding.padRight = this.decodeParam(args[1]);
            }
          }
          break;
        case 'kind':
          if (args.length === 2) {
            v = args[1];
            v = v.trim();
            if (v.length > 0) {
              result = true;
              biOpt.text.codeKind = eProcess.parse(v);
            }
          }
          break;
        case 'code':
          if (args.length === 2) {
            v = args[1];
            v = v.trim();
            if (v.length > 0) {
              result = true;
              biOpt.text.code = eKind.parse(v);
            }
          }
          break;
        case 'before':
          if (args.length === 2) {
            result = true;
            biOpt.text.before = this.decodeParam(args[1]);
          }
          break;
        case 'after':
          if (args.length === 2) {
            result = true;
            biOpt.text.after = this.decodeParam(args[1]);
          }
          break;
        case 'nolinebreaks':
          // accept nolinebreaks or nolinebreaks=true
          if (args.length === 2) {
            v = args[1];
            v = v.trim();
            if (v.length > 0) {
              result = true;
              v = v.toLocaleLowerCase();
              if (v === 'true' || v === '1') {
                biOpt.text.noLineBreaks = true;
              }
            }
          } else if (args.length === 1) {
            result = true;
            biOpt.text.noLineBreaks = true;
          }
          break;
        case 'indent':
          // accept indent or indent=true
          if (args.length === 2) {
            v = args[1];
            v = v.trim();
            if (v.length > 0) {
              result = true;
              v = v.toLocaleLowerCase();
              if (v === 'true' || v === '1') {
                biOpt.text.indent = true;
              }
            }
          } else if (args.length === 1) {
            result = true;
            biOpt.text.indent = true;
          }
          break;
        case 'whitespaceline':
          if (args.length === 2) {
            v = args[1];
            v = v.trim();
            if (v.length > 0) {
              result = true;
              biOpt.text.whiteSpaceLine = whiteSpLn.parse(v);
            }
          }
          break;
        default:
          break;
      }
      return result;
    };
    const processCodeKind = () => {
      if (biOpt.text.code > eKind.none || biOpt.text.codeKind > eProcess.none) {
        if (biOpt.text.codeKind === eProcess.none) {
          this.logger.log.warn(`when code is set the kind option of text must be set to a valid value: "${opts.join()}"`);
          // if kind is invalid the reset code
          biOpt.text.code = eKind.none;
        } else if (biOpt.text.code === eKind.none) {
          this.logger.log.warn(`when kind is set the code option of text must be set to a valid value: "${opts.join()}"`);
          // if code is invalid the reset kind
          biOpt.text.codeKind = eProcess.none;
        }
        this.logger.verbose.writeln('Text options set: ', Util.keyValueToString(biOpt.text));
      }
      if (biOpt.text.code > eKind.none && biOpt.text.codeKind > eProcess.none) {
        biOpt.text.isCode = true;
      } else {
        biOpt.text.isCode = false;
      }
    };
    //#endregion Internal Methods

    const rxText: RegExp = /\s*(text(\?.*)\s*)/i;
    if (
      opts.some(option => {
        if (rxText.test(option)) {
          const cMatch = rxText.exec(option);
          // it is relevant if any options are set.
          // text cannot run with some options being set
          let hasOption: boolean = false;
          if (cMatch && cMatch[2]) {
            // get array of strings in format of name=value or name
            const opt = ArgsUtil.splitArgsAnd(cMatch[2]);
            opt.some(kv => {
              const eqArgs = ArgsUtil.splitArgsEq(kv);
              // must be a length of 1 or two
              if (eqArgs.length === 0 || eqArgs.length > 2) {
                return false;
              }
              hasOption = processOption(eqArgs);
              return false;
            });

            biOpt.text.isSet = hasOption;
            return hasOption;
          }
        }
        return false;
      })
    ) {
      processCodeKind();
      return true;
    }
    return false;
  }
	//  #endregion

  //  #region decodeParam
  /**
   * Decodes string such as \u2014 to —
   * @description
   * Parameters are read from files with a BUILD_INCLDDE comment.
   * Since the content is read from a file any inline javascript escapes
   * are not automatically converted. This method does such conversions.
   * Unescaps any &#92;&#92; to &#92; escaped colons.
   * <div>&nbsp;</div>
   * For Example:
   * 
  ```js
  // BUILD_INCLDDE(./somfile.txt)[text?before=\n&padleft=# \u2014]
  ```
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
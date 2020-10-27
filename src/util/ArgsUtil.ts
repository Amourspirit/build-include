export class ArgsUtil {

  // #region Split Args methods
  //  #region splitArgs

  /**
   * Split a comma-delimited string into an array.     
   * Escape chars for `,` is `\,`
   * @param str String of arguments to split
   * @returns If str is empty the empty string array is returned;
   * Otherwise a string array of arguments is returned.
   */
  public static splitArgsComma(str: string): string[] {
    if (!str || str.length === 0) {
      return [];
    }

    // Store placeholder for \,
    // there is an issue here
    // [text?PadRight=\\,breakstring?width=60,flags=word]
    // padright=\\ is ecpected to pad a sing \ however it is getting
    // escaped here as 
    // text?PadRight=\breakstring?width=60,flags=word
    // need to match \, but not \\,
    str = str.replace(/\\\\/g, '\uFEFF');
    str = str.replace(/\\,/g, '\uFFFE');


    // replace \[ with [ and \] with ]
    str = str.replace(/\\\[/g, '[')
      .replace(/\\\]/g, ']');
    // Split on ,
    return str.split(',').map((s) => {
      // Restore place-held ,
      return s.replace(/\uFFFE/g, ',')
        .replace(/\uFEFF/g, '\\\\');
    });
  }
  //  #endregion
  //  #region splitAndArgs

  /**
   * Split a `&` delimited string into an array.  
   * Escape chars for `&` is `\&`
   * @param str String of arguments to split
   * @param removeFromStart determines if delimiter should be removed from start of `str` if present
   * @returns If str is empty the empty string array is returned;
   * Otherwise a string array of arguments is returned.
   * @summary If `removeFromStart` = `true` and `?` or `&` is present at start of `str`
   * then `?` and `&` are remove from start
   * of `str`.
   */
  public static splitArgsAnd(str: string, removeFromStart = true): string[] {
    if (!str) {
      return [];
    }
    str = str.trimLeft();
    if (str.length === 0) {
      return [];
    }
    if (removeFromStart) {
      const cp: number = str.charCodeAt(0);
      // check for and remoeve starting & or ?
      if (cp === 63 || cp === 38) {
        str = str.substr(1);
      }
    }

    // Store placeholder for \&
    str = str.replace(/\\\\/g, '\uFEFF');
    str = str.replace(/\\&/g, '\uFFFE');
    // Split on &
    return str.split('&').map((s) => {
      // Restore place-held &
      return s.replace(/\uFFFE/g, '&')
        .replace(/\uFEFF/g, '\\\\');
    });
  };
  //  #endregion
  //  #region splitEqArgs
  /**
   * Split a &-delimited string into an array.  
   * Escape chars for `=` is `\=`
   * @param str String of arguments to split
   * @returns If str is empty the empty string array is returned;
   * Otherwise a string array of arguments is returned.
   */
  public static splitArgsEq(str: string): string[] {
    if (!str || str.length === 0) {
      return [];
    }
    // Store placeholder for \=
    str = str.replace(/\\\\/g, '\uFEFF');
    str = str.replace(/\\=/g, '\uFFFE');
    // Split on =
    return str.split('=').map((s) => {
      // Restore place-held =
      return s.replace(/\uFFFE/g, '=')
        .replace(/\uFEFF/g, '\\\\');
    });
  }
  //  #endregion
  // #endregion

  /**
  * Decodes string such as \u2014 to —
  * 
  * @description
  * Parameters are read from files with a BUILD_INCLDDE comment.
  * Since the content is read from a file any inline javascript escapes
  * are not automatically converted. This method does such conversions.
  * Unescaps any &#92;&#92; to &#92; escaped colons.
  * <div>&nbsp;</div>
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
  public static decodeParam(str: string): { decoded: string, error: any } {
    const result = { decoded: '', error: null };
    if (str.length === 0) {
      return result;
    }
    // parameter are going to pretty much always be read from text files.
    // sometime user may want to write unincode in the form of \uxxxxx or \u{xxxxxx} inline
    // JSON.parse does not seem to handle the unicode formats - espically \u{xxxxxx} format.
    // the simple solution is to replace the unicode values before JSON.parse
    //
    // replace all \u{xxxx} values with actual uincode values
    // @ts-ignore comment suppresses all errors that originate on the following line.
    str = str.replace(/(\\u{([0-9A-Fa-f]{1,6})})/gm, (match: string, p1: string, p2: string): string => {
      // p1 is entire unicode string
      // p2 is hex value
      const num: number = parseInt(p2, 16);
      const p = String.fromCodePoint(num);
      return p;
    });
    // replace all \uxxxx values with actual uincode values
    // @ts-ignore comment suppresses all errors that originate on the following line.
    str = str.replace(/(\\u([0-9A-Fa-f]{1,5}))/gm, (match: string, p1: string, p2: string): string => {
      // p1 is entire unicode string
      // p2 is hex value
      const char = String.fromCharCode(parseInt(p2, 16));
      return char;
    });

    // Store placeholder for \\ to later be replaced by \
    str = str.replace(/\\\\/g, '\uFFFF');
    // store placeholder for \ to later be replaced by \ again
    // this will avoid a failure with JSON parse
    // str = str.replace(/\\/g, '\uFFFE');
    // replace line breaks \\r and \\n\\r with a \\n JSON.Parse will take care of the rest
    str = str.replace(/\\r\\n|\\r/gm, '\\n');
    // Restore place-held \\
    // str = str.replace(/\uFFFF/g, '\\');
    try {
      str = decodeURIComponent(JSON.parse('"' + str + '"'));
      // replace what was previously \\ with \ and restore \
      result.decoded = str.replace(/\uFFFF/g, '\\');
      // .replace(/\uFFFE/g, '\\');
      return result;
    } catch (err) {
      result.error = err;
    }
    str = decodeURIComponent(str);
    // replace what was previously \\ with \ and restore \
    result.decoded = str.replace(/\uFFFF/g, '\\');
    // .replace(/\uFFFE/g, '\\');
    return result;
  };

}
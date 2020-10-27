import { eKind, eKindType } from "../enums/enumEKind";
import { eProcess, eProcessType } from "../enums/enumEProcess";
import { codeString } from 'multi-encoder';

export class StringUtil {
  	//  #region padLeft
	/**
	 * Pads the left side of a string.
	 * @param value A string to pad left.
	 * @param padding The padding to apply
	 * If padding is a string it will be used.
	 * If padding is a number that number will be converted to spaces equal to the number
	 */
	public static padLeft(value: string, padding: string | number): string {
    const strPad = StringUtil.getPadding(padding);
    return strPad + value;
  };
	// #endregion
	//  #region getPadding
	/**
	 * Get a string that represents padding to apply to another string.
	 * @param padding A string or Number to convert to padding string.
	 * If padding is a string then it will be URI Decoded and returned.
	 *
	 * If pading was 'https%3A%2F%2Fsomeurl.com%2Fmy%20test.asp%3Fname%3Dst'
	 * it would be returned as 'https://someurl.com/my test.asp?name=ståle&car=saab'
	 */
  public static getPadding(padding: string | number): string {
    const num: number = parseInt(padding.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = padding;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      v = Math.abs(v);
      return Array(v + 1).join(' ');
    }
    if (typeof v === 'string') {
      if (v.length === 0) {
        return '';
      }
      // return decodeURIComponent(v);
      return v;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  };
	//  #endregion
	//  #region isValidPadding
	/**
	 * Get if  a string or number that represents padding is valid padding value
	 * Empty string and 0 are considered to be valid padding values as well.
	 * @param padding A string or Number to test for padding values
	 * @returns true if padding is valid; Otherwise, false
	 */
  public static isValidPadding(padding: string | number): boolean {
    const num: number = parseInt(padding.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = padding;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      return true;
    }
    if (typeof v === 'string') {
      return true;
    }
    return false;
  };
	//  #endregion

  // #region Encode/Decode methods
  //  #region stringDecodeEncode
  /**
   * Encodes or Decodes a string
   * @param s The string to encode or decode
   * @param e The kind of encodeing or decodeing,
   * such as base64, base64uri, jsString, uri
   * @param p Determins if the s is to be encoded or decoded
   */
  public static stringDecodeEncode(s: string, e: eKindType, p: eProcessType): string {
    if (p === eProcess.decode) {
      return StringUtil.stringDecode(s, e);
    }
    if (p === eProcess.encode) {
      return StringUtil.stringEncode(s, e);
    }
    return s;
  };
  //  #endregion

  //  #region stringDecode
  /**
   * Decodes a string
   * @param s The string to decode
   * @param e The kind of encodeing or decodeing,
   * such as base64, base64uri, jsString, uri
   */
  private static stringDecode(s: string, e: eKindType): string {
    if (s.length === 0) {
      return '';
    }
    let result: string;
    switch (e) {
      case eKind.uri:
        result = codeString(s, eKind.uri, eProcess.decode);
        break;
      case eKind.uriComponent:
        result = codeString(s, eKind.uriComponent, eProcess.decode);
        break;
      case eKind.base64:
        result = codeString(s, eKind.base64, eProcess.decode);
        break;
      case eKind.jsString:
        result = codeString(s, eKind.jsString, eProcess.decode);
        break;
      case eKind.tsString:
        result = codeString(s, eKind.tsString, eProcess.decode);
        break;
      default:
        result = s;
        break;
    }
    return result;
  };
  //  #endregion
  //  #region stringEncode
  /**
   * Encodes a string
   * @param s The string to encode
   * @param e The kind of encodeing or decodeing,
   * such as base64, base64uri, jsString, uri
   */
  private static stringEncode(s: string, e: eKindType): string {
    if (s.length === 0) {
      return '';
    }
    let result: string;
    switch (e) {
      case eKind.uri:
        result = codeString(s, eKind.uri, eProcess.encode);
        break;
      case eKind.uri:
        result = codeString(s, eKind.uriComponent, eProcess.encode);
        break;
      case eKind.base64:
        result = codeString(s, eKind.base64, eProcess.encode);
        break;
      case eKind.jsString:
        result = codeString(s, eKind.jsString, eProcess.encode);
        break;
      case eKind.tsString:
        result = codeString(s, eKind.tsString, eProcess.encode);
        break;
      default:
        result = s;
        break;
    }
    return result;
  };
	// #endregion
	// #endregion

}
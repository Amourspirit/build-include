import { splitByOpt, lnEndOpt } from "string-breaker";
import { BufferEncoding } from "../interface/projectInterfaces"

export class Util {
  static ALPHA_NUM_STR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  /**
   * Test if an object is a function
   * @param obj Object to test
   * @returns `true` if obj is a function; Otherwise, `false`
   */
  public static isFunction(obj: any): boolean {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  /**
   * Parses a value to enum of splitByOpt
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
   * @returns The value converted into splitByOpt
   */
  public static parseEnumSplitByOpt(value: string | number, anyCase: boolean = true): splitByOpt {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: splitByOpt = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in splitByOpt) {
          if (splitByOpt.hasOwnProperty(k)) {
            const val = splitByOpt[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: splitByOpt = val;
                return e;
              }
            }
          }
        }
      } else {
        if (v.length > 0 && v in splitByOpt) {
          let dekString: keyof typeof splitByOpt = 'width';
          dekString = v as keyof typeof splitByOpt;
          return splitByOpt[dekString];
        }
      }
    }
    return splitByOpt.width;
  };
  /**
   * Parses a value to enum of lnEndOpt
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
   * @returns The value converted into lnEndOpt
   */
  public static parseEnumLnEndOpt(value: string | number, anyCase: boolean = true): lnEndOpt {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: lnEndOpt = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in lnEndOpt) {
          if (lnEndOpt.hasOwnProperty(k)) {
            const val = lnEndOpt[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: lnEndOpt = val;
                return e;
              }
            }
          }
        }
      } else {
        if (v.length > 0 && v in lnEndOpt) {
          let dekString: keyof typeof lnEndOpt = 'noLnBr';
          dekString = v as keyof typeof lnEndOpt;
          return lnEndOpt[dekString];
        }
      }
    }
    return lnEndOpt.noLnBr;
  };
  /**
   * Escapes a string for use in a regular expression
   * @param str String to escape
   */
  public static escapeRegex(str: string): string {
    // https://stackoverflow.com/questions/5105143/list-of-all-characters-that-should-be-escaped-before-put-in-to-regex
    if (!str) {
      return '';
    }
    let s = str;
    s = s.replace(/\\/g, '\\\\') // it is important that \ is escaped first
      .replace(/\./g, '\\.')
      .replace(/\+/g, '\\+')
      .replace(/\*/g, '\\*')
      .replace(/\?/g, '\\?')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/\$/g, '\\$')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\=/g, '\\=')
      .replace(/\!/g, '\\!')
      .replace(/\>/g, '\\>')
      .replace(/\</g, '\\<')
      .replace(/\|/g, '\\|')
      .replace(/\:/g, '\\:')
      .replace(/\-/g, '\\-');
    return s;
  };

  private static createInstance<T>(t: new () => T): T {
    return new t();
  }

  /**
   * Clones a class with a default constructor
   * @param instance Instance of class with default constructor
   * @returns cloned copy of class.
   * @see [[Util.DeepCopy]]
   */
  public static clone<T extends new (...args: any[]) => any>(instance: T): T {
    // if (!instance.constructor) {
    //   throw new Error(`cloning requires a constructor for the instance`);
    // }
    const copy = this.createInstance(instance);

    // const copy = new (instance.constructor as new () => T)();
    return Util.deepCopy(copy);
  }

  /**
 * Deep copy function for TypeScript.
 * @param T Generic type of target/copied value.
 * @param target Target value to be copied.
 * @see Source project, ts-deepcopy https://github.com/ykdr2017/ts-deepcopy
 * @see Code pen {@link https://codepen.io/erikvullings/pen/ejyBYg}
 */
  public static deepCopy<T>(target: T): T {
    if (target === null) {
      return target;
    }
    if (target instanceof Date) {
      return new Date(target.getTime()) as any;
    }
    if (target instanceof Array) {
      const cp = [] as any[];
      (target as any[]).forEach((v) => { cp.push(v); });
      return cp.map((n: any) => Util.deepCopy<any>(n)) as any;
    }
    if (typeof target === 'object' && target !== {}) {
      const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
      Object.keys(cp).forEach(k => {
        cp[k] = Util.deepCopy<any>(cp[k]);
      });
      return cp as T;
    }
    return target;
  }
  /**
   * IsObject gets if a object is actually an object add not null or an array.
   * @param obj Any value to test
   * @returns {boolean} if obj is an object and not an array, returns true; Otherwise, false
   */
  public static IsObject(obj: any): obj is Object {
    return (obj && typeof obj === 'object' && !Array.isArray(obj));
  }
  /**
   * Test if a string is only white space.
   * Multi-line string are okay to use with this method.
   * @param str string to test.
   * @returns `true` if str is empty or whitespace:
   * Otherwise, `false`
   */
  public static isEmptyOrWhiteSpace(str: string): boolean {
    if (str === undefined) {
      return true;
    }
    if (str.length === 0) {
      return true;
    }
    const re = /^\s+$/;
    const match = re.exec(str);
    if (match) {
      return true;
    }
    return false;
  }

  /**
   * Merges two or more objects and return a new object of the same type.
   * @param defaults The object that contains any key/values to replace default values
   * @param opt The object(s) to merge with defaults
   * @returns an object that containg options key/values and any missing key/values that are in defaults,
   *
   * The order of the objects are passed into opt matters.
   * Object passed in eariler will be have any properties overwritten by objects passed in laster with
   * the same key names.
   */
  public static mergeDefaults<T extends object = object, U extends object = object>(defaults: U, ...opt: T[]) {
    // Example: https://jsfiddle.net/6p4rzmxo/1/
    const result = Util.deepCopy(defaults);
    Util.deepMerge(result, ...opt);
    return result;
  }

  /**
   * Merges sources into target and returns target.
   * This method is the same as DeepMerge with the excption sources must be of the same type
   * @param target The target to merge all sources into
   * @param sources The sources to merge into target
   *
   * target will be overwritten. To return a new object make the target {}
  ```ts
  const merged = Util.DeepMergeGeneric(myTargetObj, sourceObj1, sourceObj2);
  // myTargetObj will be be equal to merged ( same object )
  ```
   * or
  ```ts
  const merged = Util.DeepMergeGeneric({}, myTargetObj, sourceObj1, sourceObj2);
  ```
   */
  public static deepMergeGeneric<T extends object = object, U extends object = object>(target: T, ...sources: U[]): any {
    return Util.deepMerge(target, ...sources);
  }
  /**
   * Merges sources into target and returns target.
   * @param target The target to merge all sources into
   * @param sources The sources to merge into target
   * 
   * target will be overwritten. To return a new object make the target {}
```ts
const merged = Util.DeepMerge(myTargetObj, sourceObj1, sourceObj2);
// myTargetObj will be be equal to merged ( same object )
```
   * or
```ts
const merged = Util.DeepMerge({}, myTargetObj, sourceObj1, sourceObj2);
```
   */
  public static deepMerge<T extends object = object>(target: T, ...sources: any[]): any {
    if (!sources.length) {
      return target;
    }
    const source = sources.shift();

    if (Util.IsObject(target) && Util.IsObject(source)) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          const el = source[key];
          if (Util.IsObject(el)) {
            if (!(target[(key as unknown) as keyof T])) {
              Object.assign(target, { [key]: {} });
            };
            const newTarget = target[(key as unknown) as keyof T];
            Util.deepMerge(newTarget as Object, el);
          } else {
            Object.assign(target, { [key]: source[key] });
          }
        }
      }
    }
    return Util.deepMerge(target, ...sources);
  }

  /**
   * Gets an encoding from an input string
   * @param encoding the encoding such as ascii, utf8 to return as BufferEncoding
   * 
   * If no valid match is made the utf8 will be returned.
   * node fs file system requires a fixed string for encoding option.
   * This menthod ensure that a valid option is returned.
   */
  public static encoding(encoding: string): BufferEncoding {
    const enc = encoding.toLowerCase();
    switch (enc) {

      case 'ascii':
        return "ascii";
      case 'ucs2':
      case 'ucs-2':
        return 'ucs2'
      case 'base64':
        return 'base64'
      case 'latin1':
        return 'latin1';
      case 'binary':
        return 'binary';
      case 'hex':
        return 'hex';
      default:
        return "utf8"
    }
  }
  /**
   * Generates a random string
   * @param len the length of the string to generate
   * @param arr string of characters use to generate the the random string.
   * @returns A random string the length of len.
   */
  public static randomStr(len: number, arr: string): string {
    let ans = '';
    for (let i = len; i > 0; i--) {
      ans +=
        arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }
  /**
* Generates a random alpha string
* @param len the length of the string to generate
*/
  public static genAlphStr(len: number): string {
    return Util.randomStr(len, Util.ALPHA_NUM_STR.substr(0, 52));
  }
  /**
   * Generates a random alpha Numeric string
   * @param len the length of the string to generate
   */
  public static genAlphNumStr(len: number): string {
    return Util.randomStr(len, Util.ALPHA_NUM_STR);
  }

  /**
   * Builds a string of key value pairs for an object
   * @param data Any object that has key value pairs
   * @param joiner The seperator between each key value pair
   */
  public static keyValueToString<T extends object = object>(data: T, joiner: string = '; '): string {
    if (!Util.IsObject(data)) {
      return '';
    }
    const strArr: string[] = [];
    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        const d:any = data[(k as unknown) as keyof T];
        const str = d.toString();
        str.replace(/'/g, "\\'")
          .replace(/"/g, '\\"');
        strArr.push(k.toString() + '=' + d);
      }
    }
    return strArr.join(joiner);
  };
}


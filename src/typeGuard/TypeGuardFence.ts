import { Util } from "../util/Util";
import { IFence, IOptFence } from "../interface/projectInterfaces";

export class TypeGuardFence {
  public static isOptFence(obj: any): obj is IOptFence {
    let result = false;
    if (Util.IsObject(obj)) {
      const testFence: IOptFence = {
        start: '',
        end: ''
      };
      let loopCheck = true;
      for (const key in testFence) {
        if (Object.prototype.hasOwnProperty.call(testFence, key)) {
         if (!(key in obj)) {
           loopCheck = false;
           break;
         }
        }
      }
      result = loopCheck;
    }
    return result;
  }
  public static isFence(obj: any): obj is IFence {
    let result = false;
    if (Util.IsObject(obj)) {
      const testFence: IFence = {
        start: '',
        end: '',
        type: 0,
        remove: false
      };
      let loopCheck = true;
      for (const key in testFence) {
        if (Object.prototype.hasOwnProperty.call(testFence, key)) {
          if (!(key in obj)) {
            loopCheck = false;
            break;
          }
        }
      }
      result = loopCheck;
    }
    return result;
  }
}
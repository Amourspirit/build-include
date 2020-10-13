/**
 * @module fences
 */
import { IOptFence } from "../interface/projectInterfaces";
// #region FlexFence
/**
 * [[include:docs/IFence/IFence.md]]
 * [[include:docs/fenceOpt/flexFence/flexFence.md]]
 */
export class FlexFence implements IOptFence {
  /**
   * [[include:docs/fenceOpt/flexFence/start.md]]
   */
  public start: string | RegExp;
  /**
  * [[include:docs/fenceOpt/flexFence/end.md]]
  */
  public end: string | RegExp;
  public constructor() {
    this.start = /^(?:[ \t]+)?(?:\*)?(?:[ \t]+)?(?:(```)(?:[^` \t])([a-zA-Z\r\n]+)?)(?:[\s\S]+?)/;
    this.end = /^(?:[ \t]+)?(?:\*)?(?:[ \t]+)?(```)(?:(?:$)|(?:[\r\n]+))/;
  }
}
// #endregion
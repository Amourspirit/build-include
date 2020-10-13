/**
 * @module fences
 */
import { IOptFence } from "../interface/projectInterfaces";
// #region EscapeFence
/**
 * [[include:docs/IFence/IFence.md]]
 * [[include:docs/fenceOpt/escapeFence/escapeFence.md]]
 */
export class EscapeFence implements IOptFence {
  /**
   * [[include:docs/fenceOpt/flexFence/start.md]]
   */
  public start: string | RegExp;
  /**
   * [[include:docs/fenceOpt/flexFence/end.md]]
   */
  public end: string | RegExp;
  public constructor() {
    this.start = '````';
    this.end = '````';
  }
}
// #endregion
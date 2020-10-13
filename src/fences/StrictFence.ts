/**
 * @module fences
 */
import { IOptFence } from "../interface/projectInterfaces";
// #region strictFence
/**
 * [[include:docs/IFence/IFence.md]]
 * [[include:docs/fenceOpt/strictFence/strictFence.md]]
 * @see [[IBiGruntOpt.fence]]
 */
export class StrictFence implements IOptFence {
  /**
   * [[include:docs/fenceOpt/strictFence/start.md]]
   */
  public start: string | RegExp;
  /**
   * [[include:docs/fenceOpt/strictFence/end.md]]
   */
  public end: string | RegExp;
  public constructor() {
    this.start = '```';
    this.end = '```'
  }
}
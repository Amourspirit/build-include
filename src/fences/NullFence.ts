import { fenceKind } from "../enums/projectEnums";
/**
 * @module fences
 */
import { IFence } from "../interface/projectInterfaces";

/**
 * NullFence is a stand in fence use for internal usage.  
 * Not recommented to be use externally.
 */
export class NullFence implements IFence {
  public type: fenceKind;
  public start: string | RegExp;
  public end: string | RegExp;
  public remove: boolean;
  constructor() {
    this.end = '';
    this.start = '';
    this.remove = false;
    this.type = fenceKind.none;
  }
}
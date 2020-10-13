/**
 * @module MatchOptions
 */
import { IMatchOpt } from "../interface/projectInterfaces";
/**
 * MatchDummy is a stand in match use for internal usage.
 * Not recommented to be use externally.
 */
export class MatchDummy implements IMatchOpt {
  /**
   * Default internal number
   */
  public static DEFAULT_NUMBER = -999;
  /**
   * Default internal string
   */
  public static DEFAULT_STRING = '^^^^^^^^^^^^^';
  /**
   * Defaults to [[MatchDummy.DEFAULT_STRING]]
   */
  public path: string;
  /**
   *  Defaults to [[MatchDummy.DEFAULT_STRING]]
   */
  public name: string;
  /**
   *  Defaults to [[MatchDummy.DEFAULT_STRING]]
   */
  public fileName: string;
  /**
   *  Defaults to [[MatchDummy.DEFAULT_STRING]]
   */
  public parameters: string;
  /**
   *  Defaults to [[MatchDummy.DEFAULT_STRING]]
   */
  public prefix: string;
  /**
  *  Defaults to [[MatchDummy.DEFAULT_STRING]]
  */
  public suffix: string;
  /**
   *  Defaults to [[MatchDummy.DEFAULT_STRING]]
   */
  public options: string;
  /**
   *  Defaults to [[MatchDummy.DEFAULT_STRING]]
   */
  public kind: string;
  /**
  *  Defaults to [[MatchDummy.DEFAULT_NUMBER]]
  */
  public indexFile: number;
  /**
  *  Defaults to [[MatchDummy.DEFAULT_NUMBER]]
  */
  public indexParam: number;
  /**
   * Constructs the Dummy instance
   */
  public constructor() {
    this.path = MatchDummy.DEFAULT_STRING;
    this.name = MatchDummy.DEFAULT_STRING;
    this.fileName = MatchDummy.DEFAULT_STRING;
    this.parameters = MatchDummy.DEFAULT_STRING;
    this.prefix = MatchDummy.DEFAULT_STRING;
    this.suffix = MatchDummy.DEFAULT_STRING;
    this.options = MatchDummy.DEFAULT_STRING;
    this.kind = MatchDummy.DEFAULT_STRING;
    this.indexFile = MatchDummy.DEFAULT_NUMBER;
    this.indexParam = MatchDummy.DEFAULT_NUMBER;
  }
}
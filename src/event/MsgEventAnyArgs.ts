import { MsgEventArgs } from "./MsgEventArg";

export class MsgEventAnyArgs extends MsgEventArgs {
  public args: any[] = [];
  constructor(msg?: string) {
    super(msg);
  }
}
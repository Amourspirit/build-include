import { CancelEventArgs } from "./CancelEventArgs";

export class MsgEventArgs extends CancelEventArgs{
  public message: string = '';
  constructor(msg?:string) {
    super();
    if (msg) {
      this.message = msg;
    }
  }

}
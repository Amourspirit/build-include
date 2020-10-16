import { EventArgs } from "./EventArgs";
export class CancelEventArgs extends EventArgs {
  public cancel = false;
  constructor() {
    super()
  }
}
/**
 * Class for implementing callback events
 */
export class Events {
  private listeners: Map<string, Function[]>;
  private onceListeners: Map<string, Function[]>;
  private triggerdLabels: Map<string, any[]>;
  constructor() {
    this.listeners = new Map<string, Function[]>();
    this.onceListeners = new Map<string, Function[]>();
    this.triggerdLabels = new Map<string, any[]>();
  }

  /**
   * Helper-function for onReady and onceReady
   * the callbackfunction will execute,
   * if the label has already been triggerd with the last called parameters
   * 
   * @param label lebel of callback
   * @param callback callback function
   */
  private wasCalled(label: string, callback: Function) {
    if (this.triggerdLabels.has(label)) {
      const args = this.triggerdLabels.get(label);
      if (args) {
        callback(...args);  
      } else {
        callback();
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Execute the callback everytime the label is trigger
   * @param label label of callback
   * @param callback callback function
   * @param checkPast check if the label had been already called
   * and if so excute the callback immediately with the same
   * parameters as last callback; default: `false`
   */
  public on(label: string, callback: Function, checkPast = false) {
    if (!this.listeners.has(label))
      this.listeners.set(label, []);
    const fnArray = this.listeners.get(label);
    if (fnArray) {
      fnArray.push(callback);
    }
    if (checkPast)
      this.wasCalled(label, callback);
  }

  /**
   * Execute the callback everytime the label is triggered
   * check if the label had been already called
   * and if so excute the callback immediately with the same parameters for last callback
   * 
   * @param label label of callback
   * @param callback callback function
   */
  public onReady(label: string, callback: Function) {
    this.on(label, callback, true);
  }

  /**
   * 
   * @param label label of callback
   * @param callback callback function
   * @param checkPast check if the label had been already called
   * and if so excute the callback immediately; default: `false`
   */
  public once(label: string, callback: Function, checkPast = false) {
    if (!this.onceListeners.has(label))
      this.onceListeners.set(label, []);
    
    const doPushOnOnceListeners = (): boolean => {
      let result = true;
      if (checkPast && this.wasCalled(label, callback)) {
        result = false;
      }
      return result;
    }
    // if (!(checkPast && this.wasCalled(label, callback))) {
    if (doPushOnOnceListeners()) {
      const fnArray = this.onceListeners.get(label);
      if (fnArray) {
        fnArray.push(callback);
      }
    }
  }
  /**
   * Execute the callback onetime when the label is triggered
   * or execute the callback if the label had been called already
   * @param label Label of callback
   * @param callback Callback function
   */
  public onceReady(label: string, callback: Function) {
    this.once(label, callback, true);
  }

  /**
   * Remove the callback for a label or for a single callback
   * @param label Label of callback
   * @param callback Callback function or boolean
   * @summary If callback is a function then only that functions is removed from callbacks;
   * Otherwise, all callbacks will be removed when callback parameter = `true`
   */
  public off(label: string, callback: boolean | Function = true) {
    if (callback === true) {
      // remove listeners for all callbackfunctions
      this.listeners.delete(label);
      this.onceListeners.delete(label);
    } else if (typeof callback === 'function') {
      // remove listeners only with match callbackfunctions
      const offCallbackFn = (inListener: Map<string, Function[]>) => {
        const listeners = inListener.get(label);
        if (listeners) {
          inListener.set(label, listeners.filter((value) => !(value === callback)));
        }
      };
      offCallbackFn(this.listeners);
      offCallbackFn(this.onceListeners);
    }
  }

  /**
   * Trigger the event with the label
   * @param label Label of callback
   * @param args arggs to pass to callback
   * @returns `true` if a callback was called; Otherwise, `false`
   */
  public trigger(label: string, ...args: any[]):boolean {
    let res = false;
    this.triggerdLabels.set(label, [...args]); // save all triggerd labels for onready and onceready
    const trig = (inListener: Map<string, Function[]>, trigLabel: string, ...trigArgs: any[]) => {
      const listeners = inListener.get(trigLabel);
      if (listeners && listeners.length) {
        listeners.forEach((listener) => {
          listener(...trigArgs);
        });
        res = true;
      }
    };
    trig(this.onceListeners, label, ...args);
    trig(this.listeners, label, ...args);
    this.onceListeners.delete(label); // callback for once executed, so delete it.
    return res;
  }
}

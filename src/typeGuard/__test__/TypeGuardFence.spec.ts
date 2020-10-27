import { TypeGuardFence } from "../TypeGuardFence";

describe('Test isOptFence method', () => {
  it('should be false for undefined', (done) => {
    expect.assertions(1);
    const fence = undefined;
    expect(TypeGuardFence.isOptFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for null', (done) => {
    expect.assertions(1);
    const fence = null; // null is an object
    expect(TypeGuardFence.isOptFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for true', (done) => {
    expect.assertions(1);
    const fence = true; // null is an object
    expect(TypeGuardFence.isOptFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for {}', (done) => {
    expect.assertions(1);
    const fence = {};
    expect(TypeGuardFence.isOptFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for []', (done) => {
    expect.assertions(1);
    const fence:any = [];
    expect(TypeGuardFence.isOptFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for {start: ""}', (done) => {
    expect.assertions(1);
    const fence = {start:''};
    expect(TypeGuardFence.isOptFence(fence)).toBeFalsy();
    done();
  });

  it('should be true for {start: "", end: ""}', (done) => {
    expect.assertions(1);
    const fence = { start: '', end: '' };
    expect(TypeGuardFence.isOptFence(fence)).toBeTruthy();
    done();
  });

  it('should be true for {start: "", end: "", someother: ""}', (done) => {
    expect.assertions(1);
    const fence = { start: '', end: '', someother: 0 };
    expect(TypeGuardFence.isOptFence(fence)).toBeTruthy();
    done();
  });
});

describe('Test isFence method', () => { 
  it('should be false for undefined', (done) => {
    expect.assertions(1);
    const fence = undefined;
    expect(TypeGuardFence.isFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for null', (done) => {
    expect.assertions(1);
    const fence = null; // null is an object
    expect(TypeGuardFence.isFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for true', (done) => {
    expect.assertions(1);
    const fence = true; // null is an object
    expect(TypeGuardFence.isFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for {}', (done) => {
    expect.assertions(1);
    const fence = {};
    expect(TypeGuardFence.isFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for []', (done) => {
    expect.assertions(1);
    const fence: any = [];
    expect(TypeGuardFence.isFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for {start: "", end: ""}', (done) => {
    expect.assertions(1);
    const fence = { start: '', end: '' };
    expect(TypeGuardFence.isFence(fence)).toBeFalsy();
    done();
  });

  it('should be false for {start: "", end: "", type: 0}', (done) => {
    expect.assertions(1);
    const fence = { start: '', end: '', type: 0 };
    expect(TypeGuardFence.isFence(fence)).toBeFalsy();
    done();
  });

  it('should be ture for {start: "", end: "", type: 0, remove: false}', (done) => {
    expect.assertions(1);
    const fence = { start: '', end: '', type: 0, remove: false };
    expect(TypeGuardFence.isFence(fence)).toBeTruthy();
    done();
  });

  it('should be ture for {start: "", end: "", type: 0, remove: false, someother: "}', (done) => {
    expect.assertions(1);
    const fence = { start: '', end: '', type: 0, remove: false, someOther: '' };
    expect(TypeGuardFence.isFence(fence)).toBeTruthy();
    done();
  });
});
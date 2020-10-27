import { TildeFence } from "../TildeFence";

const tildeFence = new TildeFence();

test('Escape fence Start', (done) => {
  expect(tildeFence.start).toBe('~~~');
  done();
});

test('Escape fence End', (done) => {
  expect(tildeFence.end).toBe('~~~');
  done();
});

test('Escape fence Start equals End', (done) => {
  expect(tildeFence.start).toBe(tildeFence.end);
  done();
});
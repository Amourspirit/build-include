import { EscapeFence } from "../EscapeFence";

const escapeFence = new EscapeFence();

test('Escape fence Start', (done) => {
  expect(escapeFence.start).toBe('````');
  done();
});

test('Escape fence End', (done) => {
  expect(escapeFence.end).toBe('````');
  done();
});

test('Escape fence Start equals End', (done) => {
  expect(escapeFence.start).toBe(escapeFence.end);
  done();
});
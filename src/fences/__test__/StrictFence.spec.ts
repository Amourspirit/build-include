import { StrictFence } from "../StrictFence";

const strictFence = new StrictFence();

test('Escape fence Start', (done) => {
  expect(strictFence.start).toBe('```');
  done();
});

test('Escape fence End', (done) => {
  expect(strictFence.end).toBe('```');
  done();
});

test('Escape fence Start equals End', (done) => {
  expect(strictFence.start).toBe(strictFence.end);
  done();
});
import { EventArgs } from "../EventArgs";

test('Test Empty EventArgs', (done) => {
  expect(EventArgs.Empty).toBeInstanceOf(EventArgs);
  done();
});
import { FlexFence } from "../FlexFence";

const flexFence = new FlexFence();

test('Escape fence Start', (done) => {
  expect.assertions(1);
  expect(flexFence.start).toBeInstanceOf(RegExp);
  done();
});

test('Escape fence End', (done) => {
  expect.assertions(1);
  expect(flexFence.end).toBeInstanceOf(RegExp);
  done();
});

test('Escape fence Start to not match ```', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('```')).toBeFalsy();
  done();
});

test('Escape fence Start to not match single ```\\n', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('```\n')).toBeFalsy();
  done();
});


test('Escape fence Start to match single ```\\ntest', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('```\ntest')).toBeTruthy();
  done();
});

test('Escape fence Start ``````````any match', (done) => {
  // match 10x ` should pass
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('``````````any')).toBeTruthy();
  done();
});

test('Escape fence Start ```````````any match', (done) => {
  // match 11x ` should fail
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('```````````any')).toBeFalsy();
  done();
});

test('Escape fence Start to not match ``\\ntest', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('``\ntest')).toBeFalsy();
  done();
});

test('Escape fence Start to match •```\\ntest', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test(' ```\ntest')).toBeTruthy();
  done();
});

test('Escape fence Start to match \\t```\\ntest', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('\t```\ntest')).toBeTruthy();
  done();
});

test('Escape fence Start to match •\\t•\\t```\\ntest', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test(' \t \t```\ntest')).toBeTruthy();
  done();
});

test('Escape fence Start to match *•\\t•\\t```\\ntest', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('* \t \t```\ntest')).toBeTruthy();
  done();
});

test('Escape fence Start to match ••\\t*•\\t•\\t```\\ntest', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('  \t* \t \t```\ntest')).toBeTruthy();
  done();
});

test('Escape fence Start to match \\t````any\\ntest', (done) => {
  expect.assertions(1);
  const regx = (flexFence.start as RegExp);
  expect(regx.test('\t````any\ntest')).toBeTruthy();
  done();
});

test('Escape fence End to match ```', (done) => {
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test('```')).toBeTruthy();
  done();
});

test('Escape fence End to not match ``', (done) => {
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test('``')).toBeFalsy();
  done();
});

test('Escape fence End to match ``````````', (done) => {
  // match 10x ` should pass
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test('``````````')).toBeTruthy();
  done();
});

test('Escape fence End to match ```````````', (done) => {
  // match 11x ` should faile
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test('```````````')).toBeFalsy();
  done();
});

test('Escape fence End to match •```', (done) => {
  // match 11x ` should faile
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test(' ```')).toBeTruthy();
  done();
});

test('Escape fence End to match A•```', (done) => {
  // match 11x ` should faile
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test('A ```')).toBeFalsy();
  done();
});

test('Escape fence End to not match ••\\t*•\\t•\\t```', (done) => {
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test('  \t* \t \t```')).toBeTruthy();
  done();
});

test('Escape fence End to not match ••\\t*•\\t•\\t```\\n', (done) => {
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test('  \t* \t \t```\n')).toBeTruthy();
  done();
});

test('Escape fence End to match ```\\r', (done) => {
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test('```\r')).toBeTruthy();
  done();
});

test('Escape fence End to match ```\\r\\n', (done) => {
  expect.assertions(1);
  const regx = (flexFence.end as RegExp);
  expect(regx.test('```\r\n')).toBeTruthy();
  done();
});
const c = require('./common').common;
const opt = c.getOptions('customfenceRemove.json');

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/bi-replace04.txt', opt);
console.log(results);

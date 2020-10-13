const c = require('./common').common;
const opt = c.getOptions("singleAsterisk.json");

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/include-replace01.txt', opt);
console.log(results);

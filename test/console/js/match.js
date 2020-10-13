const c = require('./common').common;
const opt = c.getOptions('match.json');

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/bi-replace01.txt', opt);
console.log(results);

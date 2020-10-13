const c = require('./common').common;
const opt = { };

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/css.js', opt);
console.log(results);

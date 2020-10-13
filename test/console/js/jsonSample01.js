const c = require('./common').common;
const opt = c.getOptions('jsonData01.json');

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/jsonData01.js', opt);
console.log(results);

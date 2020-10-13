const c = require('./common').common;
const opt = c.getOptions('jsdoc02.json');

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/bi-replace02.txt', opt);
console.log(results);

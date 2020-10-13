const c = require('./common').common;
const opt = c.getOptions('minusPlus.json');

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/minusPlus.txt', opt);
console.log(results);

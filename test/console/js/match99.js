const c = require('./common').common;
const opt = c.getOptions('codeBase64WithMissing.json');

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/bi-replace99.txt', opt);
console.log(results);

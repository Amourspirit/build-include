const c = require('./common').common;
const opt = c.getOptions('jsCodeBase64.json');

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/base64.js', opt);
console.log(results);

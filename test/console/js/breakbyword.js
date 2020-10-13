const c = require('./common').common;
const opt = { };

const results = c.bp.buildInclude('', c.path.join(__dirname, 'fixtures/bi-replace03.txt'), opt);
console.log(results);

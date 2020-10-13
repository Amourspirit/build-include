import { IBiOpt } from "../../../src/interfaces";
import { common as c } from "./common";
import { IOpt } from "../../../src/interfaces";
// const opt: IOpt = {};

const results = c.bp.buildInclude('', '<rootDir>/test/console/fixtures/css.js');
console.log(results);

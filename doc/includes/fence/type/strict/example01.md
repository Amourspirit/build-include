### FENCE EXAMPLE

Matches built in fence rules of [StrictFence](/build-include/classes/src_fences.strictfence.html)
by seting fence to string value of [regexKind.strict](/build-include/enums/enums.fencekind.html#strict)

#### Config

````js
bp = new BuildProcess();
const opt = {
  fence: 'strict'
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
````
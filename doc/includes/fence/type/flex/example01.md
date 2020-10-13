### FENCE EXAMPLE

Matches built in fence rules of [FlexFence](/build-include/classes/src_fences.flexfence.html)
by seting fence to string value of [regexKind.flex](/build-include/enums/enums.fencekind.html#flex)

#### Config

````js
bp = new BuildProcess();
const opt = {
  fence: 'flex'
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
````
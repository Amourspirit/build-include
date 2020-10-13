### FENCE EXAMPLE

Matches built in fence rules of [EscapeFence](/build-include/classes/src_fences.escapefence.html)
by seting fence to string value of [regexKind.escape](/build-include/enums/enums.fencekind.html#escape)

#### Config

````js
bp = new BuildProcess();
const opt = {
  fence: 'escape'
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
````
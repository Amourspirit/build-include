### FENCE EXAMPLE

Matches built in fence rules of [EscapeFence](/build-include/classes/src_fences.escapefence.html) [StrictFence](/build-include/classes/src_fences.strictfence.html), [TildeFence](/build-include/classes/src_fences.tildefence.html) and [regexKind.multiFlex](/build-include/enums/enums.fencekind.html#multiFlex)

#### Config

````js
bp = new BuildProcess();
const opt = {
  fence: 'multiFlex'
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
````
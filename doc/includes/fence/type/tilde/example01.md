### FENCE EXAMPLE

Matches built in fence rules of [TildeFence](/build-include/classes/src_fences.tildefence.html)
by seting fence to string value of [regexKind.tidle](/build-include/enums/enums.fencekind.html#tilde)

````js
bp = new BuildProcess();
const opt = {
  fence: 'tilde'
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
````
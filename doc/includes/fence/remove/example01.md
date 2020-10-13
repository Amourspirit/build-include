### FENCE EXAMPLE

Matches built in fence rules of [StrictFence](/build-include/classes/src_fences.strictfence.html)
by seting fence to string value of [regexKind.strict](/build-include/enums/enums.fencekind.html#strict) and excludes fences from output.

### Config

````js
bp = new BuildProcess();
const opt = {
  fence: {
    type: "strict",
    remove: true
  }
};
const results = bp.buildInclude('','./src/main.ts',opt);
````
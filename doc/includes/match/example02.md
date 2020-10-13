### MATCH EXAMPLE

Matchs options such as:  
`---- minus_plus[scratch/main.ts] ++++`  
`----minus_plus[scratch/modules/myfile.ts]{options}++++`

The Regex will example can be see on [regexr.com](https://regexr.com/4dr4m)

**NOTE:** This match would not be able to apply [indent](/build-include/pages/Docs/Main/Options/text/indent/index.html) due to the Regular Expression
starting at the beginning of line as indicated by the `prefix` starting with `^`.

````js
bp = new BuildProcess();
const opt = {
  match: {
    name: 'minus_plus',
    fileName: `\\[(?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\\]`,
    parameters: `(?:\\{(.*)\\})?`,
    prefix: '^----[ ]*',
    suffix: '(?:(?:[ ]+)?\\+\\+\\+\\+(?:(?:$)|(?:[\\r\\n]+)))',
    options: 'im'
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt`);
````
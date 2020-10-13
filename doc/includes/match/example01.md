### MATCH EXAMPLE

Matchs options such as:  
`# INCLUDE_BUILD(scratch/main.ts)`  
`#include_build(scratch/modules/myfile.ts)`

The Regex will example can be see on [regexr.com](https://regexr.com/4d13t)

````js
bp = new BuildProcess();
const opt = {
  match: {
    name: 'include_build',
    parameters: `(?:\\[(.*)\\])?`,
    prefix: '(?:(?:#))[ \\t]*',
    suffix: ''
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt`);
````
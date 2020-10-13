Text option.  
Text options set in configuration are merged with any text options set in the file that contains the build_include ( or varation of ).
File level options will always take priority.

### Config

````js
bp = new BuildProcess();
const opt = {
 match: {
    kind: 'buildIncludeSlash',
    path: './md/'
  },
  text: {
    before: '\n',
    codekind: 'encode',
    code: 'jsString'
  }
};
const results = bp.buildInclude('','./includes/replace.js', opt);
````

#### See Examples

[Examples](/build-include/pages/Docs/examples/index.html)  
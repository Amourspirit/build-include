
#### Example

````js
bp = new BuildProcess();
const opt = {
  match: {
    kind: 'bracketInclude',
    path: './scratch/'
  },
  comment: {
    padleft: 2,
    type: 'singleAsterisk'
  }
};
const results = bp.buildInclude('','./includes/replace.js', opt);
````
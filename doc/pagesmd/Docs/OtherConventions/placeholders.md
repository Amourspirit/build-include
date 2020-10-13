## Other conventions

### Placeholders

`<rootDir>` is accepted in a path passed into [buildinclude](/build-include/classes/src.buildprocess.html#buildinclude)
and resolves to root directory of current application.

#### Example of using `<rootDir>`

```js
const bp = new BuildProcess();
const opt = {
  comment: {
    type: "singleAsterisk"
  },
   breakstring: {
     width: 60,
     flags: "word"
   },
   match: {
     kind: "bracketIncludeMulti"
   },
   text: {
     indent: true
   }
};
const results = bp.buildInclude('', '<rootDir>/test/fixtures/bi-replace01.txt', opt);
console.log(results);
```

### Passing File contents into buildInclude

File contents can be passed directly into [buldInclude](/build-include/classes/src.buildprocess.html#buildinclude)  

**See example:** [Pass File contents](/build-include/pages/Docs/examples/IncludeJsonReadContents.html)
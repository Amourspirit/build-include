# BUILD_INCLUDE

Build-Include has a primary purpose of reading input file and finding matching *build-include* statements that are
parsed and replaced with the actual contents.

## Simple example

*main.js* includes in it contents the following line

```js
// BUILD_INCLUDE(./includes/replaceComment.txt)
```

### Build-Include Replace

```js
const bp = new BuildProcess();
const results = bp.buildInclude('','./lib/main.js', {});
```

The **// BUILD_INCLUDE** in main.js will be replaced with the contents of *replaceComment.txt*.

See other [examples](/build-include/pages/Docs/examples/index.html)

## Options

Many [Options](/build-include/pages/Docs/Main/Options/asjsstring/index.html) may be used with **build_include**.  

Setting up instance of **build-include**

## Simple Setup

### Common JS

```js
import { BuildProcess } from 'build-include/cjs/BuildProcess';
import { LoggerSimple } from "build-include/cjs/log/LoggerSimple";

// include LoggerSimple in the constructor so instance logs to the console.
const bp = new BuildProcess(new LoggerSimple());

const opt = {
  comment: {
    type: "Single"
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
```

### ES6 Module

```js
import { BuildProcess } from 'build-include/esm/BuildProcess';
import { LoggerSimple } from "build-include/esm/log/LoggerSimple";

// include LoggerSimple in the constructor so instance logs to the console.
const bp = new BuildProcess(new LoggerSimple());

const opt = {
  comment: {
    type: "Single"
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
```

See: [Comment Type Single](/build-include/pages/Docs/examples/CommentTypeSingle.html) for full example.

## See Also

* [Options](/build-include/pages/Docs/Main/Options/asjsstring/index.html)
* [Logging](/build-include/pages/Docs/Logging/index.html)
* [Examples](/build-include/pages/Docs/examples/index.html)
* [Source Documentation](/build-include/modules/src.html)
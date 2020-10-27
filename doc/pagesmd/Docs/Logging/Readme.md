## Logging

By default instances of [[BuildProcess]] do not log activity.

There are two loggers that come bundled with **build-include**.  

[[LoggerSimple]] - Logs activity to console.
[[LoggerEvent]] - Actually ignores all logging.
This is the default logger used if no other logger is specified.

Custom Loggers can be created  by creating a class thet implements the Interface [[ILogger]]
and a class the implements Interface [[ILog]].

### Log to Console

Logging with [[LoggerSimple]]

#### Common JS

```js
import { BuildProcess } from 'build-include/cjs/BuildProcess';
import { LoggerSimple } from "build-include/cjs/log/LoggerSimple";

// include LoggerSimple in the constructor so instance logs to the console.
const bp = new BuildProcess(new LoggerSimple());

const opt = {
  match: {
    kind: "buildIncludeSlash"
  },
  comment: {
    type: "Single"
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
```

#### ES6 Module

```js
import { BuildProcess } from 'build-include/esm/BuildProcess';
import { LoggerSimple } from "build-include/esm/log/LoggerSimple";

// include LoggerSimple in the constructor so instance logs to the console.
const bp = new BuildProcess(new LoggerSimple());

const opt = {
  match: {
    kind: "buildIncludeSlash"
  },
  comment: {
    type: "Single"
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
```

### NO Logging

Logging with [[LoggerEvent]] requires no logger to be passed into constructor.  
Due to the fact that [[LoggerEvent]] only raises events no actual logging will take place.

#### Common JS

```js
import { BuildProcess } from 'build-include/cjs/BuildProcess';

const bp = new BuildProcess();

const opt = {
  match: {
    kind: "buildIncludeSlash"
  },
  comment: {
    type: "Single"
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
```

#### ES6 Module

```js
import { BuildProcess } from 'build-include/esm/BuildProcess';

const bp = new BuildProcess();

const opt = {
  match: {
    kind: "buildIncludeSlash"
  },
  comment: {
    type: "Single"
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
```

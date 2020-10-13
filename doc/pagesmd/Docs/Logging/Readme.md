## Logging

By default instances of [BuildProcess](/build-include/classes/src.buildprocess.html) do not log activity.

There are two loggers that come bundled with **build-include**.  

[LoggerSimple](/build-include/classes/src_log.loggersimple.html). Logs activity to console.
[LoggerNull](/build-include/classes/src_log.loggernull.html) - Actually ignores all logging.
This is the default logger used if no other logger is specified.

Custom Loggers can be created  by creating a class thet implements the [Interface ILogger](/build-include/interfaces/src_interface.ilogger.html)
and a class the implements [Interface ILog](/build-include/interfaces/src_interface.ilog.html).

See [Class LogSimple](/build-include/classes/src_log.logsimple.html) and
[Class LoggerSimple](/build-include/classes/src_log.loggersimple.html) for examples.

### Log to Console

Logging with [LogSimple](/build-include/classes/src_log.logsimple.html)

#### Common JS

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

#### ES6 Module

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

### NO Logging

Logging with [LoggerNull](/build-include/classes/src_log.loggernull.html) requires not logger to be passed into constructor.

#### Common JS

```js
import { BuildProcess } from 'build-include/cjs/BuildProcess';

const bp = new BuildProcess();

const opt = {
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
  comment: {
    type: "Single"
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
```

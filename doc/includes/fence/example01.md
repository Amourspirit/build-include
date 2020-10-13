### FENCE EXAMPLE

Matches:  

```text
---
fenced text
---
```

--or--

```text
---text
fenced text
---
```

#### Config

````js
bp = new BuildProcess();
const opt = {
  fence: {
    start: /^---(?:([a-zA-Z]+)?(?:[\r\n]+))(?:[\s\S]+?)/,
    end: /^---(?:(?:$)|(?:[\r\n]+))/
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
````
# Fenced, Comment, Text simple Example

File [replace03.txt](replacements/replace03.txt.html) is to be included in output file.
File [replace03.txt](replacements/replace03.txt.html) contains fences and enpty lines.  
In this example fences are excluded from any extra processing and included verbatim in the output.

### Input

```ts
/**
 * [[include:includes/includeSubs/include-replaace03.md]]
 */
export interface IKeyValue<T> {
  [key: string]: T;
}
```


### Options

<div class="nowrapcode">

```text
[fence?type=multiflex,comment?type=singleAsterisk,text?indent=true]
```

</div>

### Config

````js
const bp = new BuildProcess();
const opt = {
  match: {
    kind: 'bracketIncludeMulti',
    path: './fixtures/'
  },
  comment: {
    type: 'singleAsterisk'
  },
  text: {
    indent: true
  },
  fence: 'strict'
};
const results = bp.buildInclude('','./src/interfaces.ts', opt);
````

### Output

````ts
/**
  * Represents a generic item with a string key value
  * 
  * Example:
  * 
```ts
const lst: IKeyValuec<string> = {
    src: 'https://someUrl.come/js/myjs.js',
    scrolling: 'yes',
    type: 'text/javascript'
};
for (const key in lst) {
    if (lst.hasOwnProperty(key)) {
    const value = lst[key];
    console.log(key, value);
    }
}
console.log('src: ', lst['src']);
console.log('type: ', lst.type);
```
  */
export interface IKeyValue<T> {
  [key: string]: T;
}
````

[[include:includes/fence/fence.md]]

[[include:includes/fence/type/type.md]]

[[include:includes/fence/type/multiFlex/multiflex.md]]
See: Fence Type [MultiFlex](/build-include/pages/Docs/Main/Options/fence/type/MultiFlex/index.html)

[[include:includes/comment/comment.md]]

[[include:includes/comment/type/SingleAsterisk.md]]

[[include:includes/text/text.md]]

[[include:includes/text/indent/indent.md]]


`{match:{kind: "bracketIncludeMulti" }}`  
[[include:docs/enums/regexKind/bracketIncludeMulti.md]]

[[include:includes/options/iopt.md]]
[[include:includes/match/regexKind.md]]
[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]
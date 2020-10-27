# Fenced, Comment, Text Example

## BUILD_INCLUDE

<div class="nowrapcode">

```js
/**
 // build_include('./fixtures/md/replace02.txt')[fence?type=multiflex&remove=true,comment?type=singleAsterisk,text?indent=true&whiteSpaceLine=removeAllWs]
 */
```

</div>

File [replace02.txt](replacements/replace02.txt.html) is to be included in output file.


<div class="nowrapcode">

```text
[fence?type=multiflex&remove=true,comment?type=singleAsterisk,text?indent=true&whiteSpaceLine=removeAllWs]
```

</div>

### Config

````js
const bp = new BuildProcess();
const opt = {
  match: {
    kind: "buildIncludeSlash"
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
````


### Output

<div class="nowrapcode">

```js
/**
 * # Fence Test
 * ## Repace02
 * `type=multiflex` Apply multiflex fencing options.  
 * Matches the pattern of:  
 * (optional space)(optional `*`)(optional space)(reguired &#96;&#96;&#96;(optional type)
 * fenced text
 * (reguired &#96;&#96;&#96;)
 * Some match examples:
 * See Also: [flexFence](/modules/_modules_fenceoptions_.html#flexfence)  
 */
```

</div>


[[include:includes/fence/fence.md]]

[[include:includes/fence/type/type.md]]

[[include:includes/fence/type/multiFlex/multiflex.md]]
See: Fence Type [MultiFlex](/build-include/pages/Docs/Main/Options/fence/type/MultiFlex/index.html)

[[include:includes/fence/remove/remove.md]]

[[include:includes/comment/comment.md]]

[[include:includes/comment/type/SingleAsterisk.md]]

[[include:includes/text/text.md]]

[[include:includes/text/indent/indent.md]]

[[include:includes/text/whiteSpaceLine/removeAllWs.md]]

`{match:{kind: "buildIncludeSlash" }}`  
[[include:docs/enums/regexKind/buildIncludeSlash.md]]

[[include:includes/options/iopt.md]]
[[include:includes/match/regexKind.md]]
[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]
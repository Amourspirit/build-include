# Comment Type Html

## BUILD_INCLUDE

<div class="nowrapcode">

```html
<!-- BUILD_INCLUDE("./includes/replace01.txt") -->
```

</div>

File [replace01.txt](replacements/replace01.txt.html) is to be included in output file.

### Config

````js
const bp = new BuildProcess();
const opt = {
  "match": {
    "kind": "buildIncludeHtml"
  },
  "comment": {
    "type": "html"
  },
  "breakstring": {
    "width": 70,
    "flags": "word"
  }
};
const results = bp.buildInclude('','./includes/test.txt', opt);
````

### Output

<div class="nowrapcode">

```html
<!--
The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz
prog. Junk MTV quiz graced by fox whelps.Bawds jog, flick quartz, vex
nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived
waltz. Brick quiz whangs jumpy veldt fox.Bright vixens jump; dozy fowl
quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing
daft Jim. Sex-charged fop blew my junk TV quiz.How quickly daft jumping
zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my
woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking
zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy
sphinx waves quart jug of bad milk.A very bad quack might jinx zippy fowls.
Few quips galvanized the mock jury box. Quick brown dogs jump over the
lazy fox. The jay, pig, fox, zebra, and my wolves quack!Blowzy red vixens
fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s
job is to vex chumps quickly in fog. Watch "Jeopardy! ", Alex Trebek's
fun TV quiz game. Woven silk pyjamas exchanged for blue quartz.
-->
```

</div>

## Options

[[include:includes/enums/regexKind/buildIncludeHtml.md]]

[[include:includes/comment/comment.md]]

[[include:/includes/comment/type/html.md]]

[[include:includes/breakstring/breakstring.md]]

[[include:includes/breakstring/width.md]]

[[include:includes/breakstring/flags/word.md]]

`{match:{kind: "buildIncludeHtml" }}`  
[[include:docs/enums/regexKind/buildIncludeHtml.md]]

[[include:includes/options/iopt.md]]
[[include:includes/match/regexKind.md]]
[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]
# Single Comment Breakstring Flags Eol

## BUILD_INCLUDE

File [replace01.txt](replacements/replace01.txt.html) is to be included in output file.

<div class="nowrapcode">

```text
// BUILD_INCLUDE("./scratch/replace1.txt")
```

</div>

### Config

````js
const bp = new BuildProcess();
const opt = {
  match: {
    kind: "buildIncludeSlash"
  },
  comment: {
    type: "Single"
  },
  breakstring: {
    width: 75,
    flags: 'word',
    eol: 'none'
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt);
````

### Output

```text
// The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog.
// Junk MTV quiz graced by fox whelps.
// Bawds jog, flick quartz, vex nymphs. Waltz,
// bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz
// whangs jumpy veldt fox.
// Bright vixens jump; dozy fowl quack. Quick wafting
// zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop
// blew my junk TV quiz.
// 
// How quickly daft jumping zebras vex. Two driven jocks
// help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz
// Jack!
// " my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed
// by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk.
// A
// very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box.
// Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves
// quack!
// Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed
// by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!
// ", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz.
```

### Options

`[comment?type=Single, breakstring?width=75&flags=word&eol=none]`

[[include:includes/comment/comment.md]]
[[include:includes/comment/type/single.md]]
[[include:includes/breakstring/breakstring.md]]
[[include:includes/breakstring/width.md]]
[[include:includes/breakstring/flags/word.md]]
[[include:includes/breakstring/eol/none.md]]

### Option

`breakstring?width=75&flags=word&eol=none`

`width=75` determines that breaking of lines is to start at 75 characters.  
Due to `eol=none` the output will break when it gets to `width` or the end or a line.

`{match:{kind: "buildIncludeSlash" }}`  
[[include:docs/enums/regexKind/buildIncludeSlash.md]]

[[include:includes/options/iopt.md]]
[[include:includes/match/regexKind.md]]
[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]
# Custom Fence Remove

## BUILD_INCLUDE

```text
// BUILD_INCLUDE("./includes/replace.txt")
```

File [replace04.txt](replacements/replace04.txt.html) is to be included in output file.

### Config

````js
const bp = new BuildProcess();
const opt = {
  fence: {
    start: "^^^^",
    end: "^^^^",
    remove: true
  },
  breakstring: {
    width: 70,
    flags: "word"
  },
  comment: {
    type: "jsDoc"
  }
}
const results = bp.buildInclude('','./includes/test.txt', opt);
````

### Output

In this case the fenced text is removed from the output.

<div class="nowrapcode">

```text
/**
 * The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz
 * prog. Junk MTV quiz graced by fox whelps.Bawds jog, flick quartz, vex
 * nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived
 * waltz. Brick quiz whangs jumpy veldt fox.Bright vixens jump; dozy fowl
 * quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing
 * daft Jim. Sex-charged fop blew my junk TV quiz.
 * How quickly daft jumping zebras vex. Two driven jocks help fax my big
 * quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my
 * brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by
 * job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk.A
 * very bad quack might jinx zippy fowls. Few quips galvanized the mock jury
 * box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra,
 * and my wolves quack!Blowzy red vixens fight for a quick jump. Joaquin
 * Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly
 * in fog. Watch "Jeopardy! ", Alex Trebek's fun TV quiz game. Woven silk
 * pyjamas exchanged for blue quartz.
 */
```

</div>

## Options

[[include:includes/fence/fence.md]]

[[include:includes/fence/start/start.md]]

[[include:includes/fence/end/end.md]]

[[include:includes/comment/comment.md]]

[[include:/includes/comment/type/jsdoc.md]]

[[include:includes/breakstring/breakstring.md]]

[[include:includes/breakstring/width.md]]

[[include:includes/breakstring/flags/word.md]]

[[include:includes/enums/regexKind/buildInclude.md]]

[[include:includes/options/iopt.md]]

[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]
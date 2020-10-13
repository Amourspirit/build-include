### MATCH EXAMPLE

Matches built in match rules of [MatchBuildIncludeSlash](/build-include/classes/src_matchoptions.matchbuildincludeslash.html)
by seting match to string value of [regexKind.buildIncludeSlash](/build-include/enums/enums.regexkind.html#buildincludeslash)

````js
bp = new BuildProcess();
const opt = {
  match: 'BuildIncludeSlash'
};
const results = bp.buildInclude('','./includes/replace.txt', opt`);
````
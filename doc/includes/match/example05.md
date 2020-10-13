### MATCH EXAMPLE

This example shows how `match` can merge with other built in [matches](/build-include/enums/enums.regexkind.html).  
By setting `kind` value to [buildIncludeHtml](/build-include/enums/enums.regexkind.html#buildincludehtml) this match
will match all the values of [MatchBuildIncludeHtml](/build-include/classes/src_matchoptions.matchbuildincludehtml.html)
excpet will match on name `BUILD_HTML` instead of default value of [MatchBuildIncludeHtml.name](/build-include/classes/src_matchoptions.matchbuildincludehtml.html#name) which is `BUILD_INCLUDE`.

Matchs options such as:  
`<!-- BUILD_HTML(scratch/main.ts) -->`  
`<!-- BUILD_HTML(scratch/modules/myfile.ts) -->`

````js
bp = new BuildProcess();
const opt = {
  match: {
    kind: 'buildIncludeHtml',
    name: 'BUILD_HTML'
  }
};
const results = bp.buildInclude('','./includes/replace.txt', opt`);
````
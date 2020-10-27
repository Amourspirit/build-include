### EXAMPLE

With the configuration below all inline BUILD_INCLUDE statments would have [asJsString](/build-include/pages/Docs/Main/Options/asjsstring/index.html) applied
and each BUILD_INCLUE file would be split into lines that are 100 characters wide with extra line breaks removed using [breakstring](/build-include/pages/Docs/Main/Options/breakstring/index.html).

### Config

````js
const bp = new BuildProcess();
const opt = {
  match: {
    kind: "buildIncludeSlash"
  },
  asJsString: true,
  breakstring: {
    width: 100,
    break: 'width',
    eol: 'noLnBr'
  }
  override: true
}
const results = bp.buildInclude('','./includes/replace.txt', opt);
````

# Base 64 Encoding

## BUILD_INCLUDE

```js
const getBase64Text = function () {
  const base64 = '// BUILD_INCLUDE(replace01.txt)';
  return base64;
};
```

File [replace01.txt](replacements/replace01.txt.html) is to be included in output file.

### Config

````js
const bp = new BuildProcess();
const opt = {
  asJsString: true,
  text: {
    code: "base64",
    codekind: "encode"
  },
  breakstring: {
    width: 70
  }
};
const results = bp.buildInclude('','./includes/base64.js',opt);
````

### Output

<div class="nowrapcode">

```js
const getBase64Text = function () {
  const base64 = '\
XG5UaGUgcXVpY2ssIGJyb3duIGZveCBqdW1wcyBvdmVyIGEgbGF6eSBkb2cuIERKcyBmb\
G9jayBieSB3aGVuIE1UViBheCBxdWl6IHByb2cuIEp1bmsgTVRWIHF1aXogZ3JhY2VkIG\
J5IGZveCB3aGVscHMuXG5CYXdkcyBqb2csIGZsaWNrIHF1YXJ0eiwgdmV4IG55bXBocy4\
gV2FsdHosIGJhZCBueW1waCwgZm9yIHF1aWNrIGppZ3MgdmV4ISBGb3ggbnltcGhzIGdy\
YWIgcXVpY2staml2ZWQgd2FsdHouIEJyaWNrIHF1aXogd2hhbmdzIGp1bXB5IHZlbGR0I\
GZveC5cbkJyaWdodCB2aXhlbnMganVtcDsgZG96eSBmb3dsIHF1YWNrLiBRdWljayB3YW\
Z0aW5nIHplcGh5cnMgdmV4IGJvbGQgSmltLiBRdWljayB6ZXBoeXJzIGJsb3csIHZleGl\
uZyBkYWZ0IEppbS4gU2V4LWNoYXJnZWQgZm9wIGJsZXcgbXkganVuayBUViBxdWl6Llxu\
XG5Ib3cgcXVpY2tseSBkYWZ0IGp1bXBpbmcgemVicmFzIHZleC4gVHdvIGRyaXZlbiBqb\
2NrcyBoZWxwIGZheCBteSBiaWcgcXVpei4gUXVpY2ssIEJheiwgZ2V0IG15IHdvdmVuIG\
ZsYXggam9kaHB1cnMhIFwiTm93IGZheCBxdWl6IEphY2shXG5cIiBteSBicmF2ZSBnaG9\
zdCBwbGVkLiBGaXZlIHF1YWNraW5nIHplcGh5cnMgam9sdCBteSB3YXggYmVkLiBGbHVt\
bW94ZWQgYnkgam9iLCBrdmV0Y2hpbmcgVy4gemFwcyBJcmFxLiBDb3p5IHNwaGlueCB3Y\
XZlcyBxdWFydCBqdWcgb2YgYmFkIG1pbGsuXG5BIHZlcnkgYmFkIHF1YWNrIG1pZ2h0IG\
ppbnggemlwcHkgZm93bHMuIEZldyBxdWlwcyBnYWx2YW5pemVkIHRoZSBtb2NrIGp1cnk\
gYm94LiBRdWljayBicm93biBkb2dzIGp1bXAgb3ZlciB0aGUgbGF6eSBmb3guIFRoZSBq\
YXksIHBpZywgZm94LCB6ZWJyYSwgYW5kIG15IHdvbHZlcyBxdWFjayFcbkJsb3d6eSByZ\
WQgdml4ZW5zIGZpZ2h0IGZvciBhIHF1aWNrIGp1bXAuIEpvYXF1aW4gUGhvZW5peCB3YX\
MgZ2F6ZWQgYnkgTVRWIGZvciBsdWNrLiBBIHdpemFyZOKAmXMgam9iIGlzIHRvIHZleCB\
jaHVtcHMgcXVpY2tseSBpbiBmb2cuIFdhdGNoIFwiSmVvcGFyZHkhIFwiLCBBbGV4IFRy\
ZWJla1wncyBmdW4gVFYgcXVpeiBnYW1lLiBXb3ZlbiBzaWxrIHB5amFtYXMgZXhjaGFuZ\
2VkIGZvciBibHVlIHF1YXJ0ei4=';
  return base64;
};
```

</div>

## Options

[[include:includes/asjsstring/asjsstring.md]]

[[include:includes/breakstring/breakstring.md]]

[[include:includes/breakstring/width.md]]

[[include:includes/text/text.md]]

[[include:includes/text/code/base64.md]]

[[include:includes/options/iopt.md]]

[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]
# Ignore Misssing

## BUILD_INCLUDE


```js
// BUILD_INCLUDE(replace99.txt) Missing file

// BUILD_INCLUDE(replace01.txt)
```

### Config

Any Missing file will be ignoreed with [ignoreMissing](/build-include/pages/Docs/Main/Options/ignoreMissing/index.html) is set to `true`

````js
const bp = new BuildProcess();
const opt = {
  text: {
    code: "base64",
    codekind: "encode"
  },
  breakstring: {
    width: 70
  },
  ignoreMissing: true
};
const results = bp.buildInclude('', '<rootDir>/test/console/fixtures/bi-replace99.txt', opt);
````

### Output

```text
// BUILD_INCLUDE(replace99.txt) Missing file

ClRoZSBxdWljaywgYnJvd24gZm94IGp1bXBzIG92ZXIgYSBsYXp5IGRvZy4gREpzIGZsb2
NrIGJ5IHdoZW4gTVRWIGF4IHF1aXogcHJvZy4gSnVuayBNVFYgcXVpeiBncmFjZWQgYnkg
Zm94IHdoZWxwcy4KQmF3ZHMgam9nLCBmbGljayBxdWFydHosIHZleCBueW1waHMuIFdhbH
R6LCBiYWQgbnltcGgsIGZvciBxdWljayBqaWdzIHZleCEgRm94IG55bXBocyBncmFiIHF1
aWNrLWppdmVkIHdhbHR6LiBCcmljayBxdWl6IHdoYW5ncyBqdW1weSB2ZWxkdCBmb3guCk
JyaWdodCB2aXhlbnMganVtcDsgZG96eSBmb3dsIHF1YWNrLiBRdWljayB3YWZ0aW5nIHpl
cGh5cnMgdmV4IGJvbGQgSmltLiBRdWljayB6ZXBoeXJzIGJsb3csIHZleGluZyBkYWZ0IE
ppbS4gU2V4LWNoYXJnZWQgZm9wIGJsZXcgbXkganVuayBUViBxdWl6LgoKSG93IHF1aWNr
bHkgZGFmdCBqdW1waW5nIHplYnJhcyB2ZXguIFR3byBkcml2ZW4gam9ja3MgaGVscCBmYX
ggbXkgYmlnIHF1aXouIFF1aWNrLCBCYXosIGdldCBteSB3b3ZlbiBmbGF4IGpvZGhwdXJz
ISAiTm93IGZheCBxdWl6IEphY2shCiIgbXkgYnJhdmUgZ2hvc3QgcGxlZC4gRml2ZSBxdW
Fja2luZyB6ZXBoeXJzIGpvbHQgbXkgd2F4IGJlZC4gRmx1bW1veGVkIGJ5IGpvYiwga3Zl
dGNoaW5nIFcuIHphcHMgSXJhcS4gQ296eSBzcGhpbnggd2F2ZXMgcXVhcnQganVnIG9mIG
JhZCBtaWxrLgpBIHZlcnkgYmFkIHF1YWNrIG1pZ2h0IGppbnggemlwcHkgZm93bHMuIEZl
dyBxdWlwcyBnYWx2YW5pemVkIHRoZSBtb2NrIGp1cnkgYm94LiBRdWljayBicm93biBkb2
dzIGp1bXAgb3ZlciB0aGUgbGF6eSBmb3guIFRoZSBqYXksIHBpZywgZm94LCB6ZWJyYSwg
YW5kIG15IHdvbHZlcyBxdWFjayEKQmxvd3p5IHJlZCB2aXhlbnMgZmlnaHQgZm9yIGEgcX
VpY2sganVtcC4gSm9hcXVpbiBQaG9lbml4IHdhcyBnYXplZCBieSBNVFYgZm9yIGx1Y2su
IEEgd2l6YXJk4oCZcyBqb2IgaXMgdG8gdmV4IGNodW1wcyBxdWlja2x5IGluIGZvZy4gV2
F0Y2ggIkplb3BhcmR5ISAiLCBBbGV4IFRyZWJlaydzIGZ1biBUViBxdWl6IGdhbWUuIFdv
dmVuIHNpbGsgcHlqYW1hcyBleGNoYW5nZWQgZm9yIGJsdWUgcXVhcnR6Lg==
```

File [replace01.txt](replacements/replace01.txt.html) is to be included in output file.

## Options

[[include:includes/breakstring/breakstring.md]]

[[include:includes/breakstring/width.md]]

[[include:includes/text/text.md]]

[[include:includes/text/code/base64.md]]

[[include:includes/ignoreMissing/ignoreMissing.md]]

[[include:includes/options/iopt.md]]

[[include:style/heading.html]]
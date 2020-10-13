# Breakstring Before and After

## BUILD_INCLUDE

```js
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
    width: 70,
    before: "(",
    after: ")"
  }
};
const results = bp.buildInclude('', '<rootDir>/test/console/fixtures/bi-replace99.txt', opt);
````

### Output

```text
(ClRoZSBxdWljaywgYnJvd24gZm94IGp1bXBzIG92ZXIgYSBsYXp5IGRvZy4gREpzIGZsb
2NrIGJ5IHdoZW4gTVRWIGF4IHF1aXogcHJvZy4gSnVuayBNVFYgcXVpeiBncmFjZWQgYnk
gZm94IHdoZWxwcy4KQmF3ZHMgam9nLCBmbGljayBxdWFydHosIHZleCBueW1waHMuIFdhb
HR6LCBiYWQgbnltcGgsIGZvciBxdWljayBqaWdzIHZleCEgRm94IG55bXBocyBncmFiIHF
1aWNrLWppdmVkIHdhbHR6LiBCcmljayBxdWl6IHdoYW5ncyBqdW1weSB2ZWxkdCBmb3guC
kJyaWdodCB2aXhlbnMganVtcDsgZG96eSBmb3dsIHF1YWNrLiBRdWljayB3YWZ0aW5nIHp
lcGh5cnMgdmV4IGJvbGQgSmltLiBRdWljayB6ZXBoeXJzIGJsb3csIHZleGluZyBkYWZ0I
EppbS4gU2V4LWNoYXJnZWQgZm9wIGJsZXcgbXkganVuayBUViBxdWl6LgoKSG93IHF1aWN
rbHkgZGFmdCBqdW1waW5nIHplYnJhcyB2ZXguIFR3byBkcml2ZW4gam9ja3MgaGVscCBmY
XggbXkgYmlnIHF1aXouIFF1aWNrLCBCYXosIGdldCBteSB3b3ZlbiBmbGF4IGpvZGhwdXJ
zISAiTm93IGZheCBxdWl6IEphY2shCiIgbXkgYnJhdmUgZ2hvc3QgcGxlZC4gRml2ZSBxd
WFja2luZyB6ZXBoeXJzIGpvbHQgbXkgd2F4IGJlZC4gRmx1bW1veGVkIGJ5IGpvYiwga3Z
ldGNoaW5nIFcuIHphcHMgSXJhcS4gQ296eSBzcGhpbnggd2F2ZXMgcXVhcnQganVnIG9mI
GJhZCBtaWxrLgpBIHZlcnkgYmFkIHF1YWNrIG1pZ2h0IGppbnggemlwcHkgZm93bHMuIEZ
ldyBxdWlwcyBnYWx2YW5pemVkIHRoZSBtb2NrIGp1cnkgYm94LiBRdWljayBicm93biBkb
2dzIGp1bXAgb3ZlciB0aGUgbGF6eSBmb3guIFRoZSBqYXksIHBpZywgZm94LCB6ZWJyYSw
gYW5kIG15IHdvbHZlcyBxdWFjayEKQmxvd3p5IHJlZCB2aXhlbnMgZmlnaHQgZm9yIGEgc
XVpY2sganVtcC4gSm9hcXVpbiBQaG9lbml4IHdhcyBnYXplZCBieSBNVFYgZm9yIGx1Y2s
uIEEgd2l6YXJk4oCZcyBqb2IgaXMgdG8gdmV4IGNodW1wcyBxdWlja2x5IGluIGZvZy4gV
2F0Y2ggIkplb3BhcmR5ISAiLCBBbGV4IFRyZWJlaydzIGZ1biBUViBxdWl6IGdhbWUuIFd
vdmVuIHNpbGsgcHlqYW1hcyBleGNoYW5nZWQgZm9yIGJsdWUgcXVhcnR6Lg==)
```

File [replace01.txt](replacements/replace01.txt.html) is to be included in output file.

## Options

[[include:includes/breakstring/breakstring.md]]

[[include:includes/breakstring/width.md]]

[[include:includes/text/text.md]]

[[include:includes/text/code/base64.md]]

[[include:includes/options/iopt.md]]

[[include:style/heading.html]]
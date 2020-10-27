<p align="center">
«-(¯`v´¯)-« <a href="https://www.npmjs.com/package/build-include">【-🇧​🇺​🇮​🇱​🇩​-🇮​🇳​🇨​🇱​🇺​🇩​🇪​】</a> »-(¯`v´¯)-»
</ br>
</p>
<p align="center">
<a href="https://travis-ci.org/Amourspirit/build-include"><img src="https://travis-ci.org/Amourspirit/build-include.svg?branch=master" /></a>
<a href="https://snyk.io/test/github/Amourspirit/build-include?targetFile=package.json">
<img src="https://snyk.io/test/github/Amourspirit/build-include/badge.svg?targetFile=package.json" /></a>
<a href="https://www.npmjs.com/package/build-include"><img alt="node" src="https://img.shields.io/node/v/build-include.svg"></a>
<img src="https://img.shields.io/github/package-json/v/Amourspirit/build-include.svg" />
<img src="https://img.shields.io/github/license/Amourspirit/build-include.svg" />
<a href="https://github.com/badges/stability-badges"> <img src="https://badges.github.io/stability-badges/dist/stable.svg" /></a>
</p>

# build-include

## Documentation

Extensive documentation can be found [here](https://amourspirit.github.io/build-include/pages/Docs/index.html).

## The What

This is a project that can be used to make other plugins such as [grunt-build-include](https://www.npmjs.com/package/grunt-build-include) or can be use in
node project where custom build include are needed.

Can be a simple include that replaces **build_include** statement with with the contents of a file.

**Example:**

```js
// BUILD_INCLUDE("./scratch/mysnippet.js")
```

Can be a more complex replacement that applies formating using [Options](https://amourspirit.github.io/build-include/pages/Docs/Main/Options/asjsstring/index.html)

**Example:**

```js
var getStyleCss = function () {
  var css = '// BUILD_INCLUDE("./scratch/style.min.css")[asjsstring,breakString?width=80]';
  return css;
};
```

**See Example:** [Asjsstring Include Text In Javascript String](https://amourspirit.github.io/build-include/pages/Docs/examples/AsjsstringIncludeTextInJavascriptString.html)

## Getting started

```text
npm install build-include --save
```

[grunt-build-include](https://www.npmjs.com/package/grunt-build-include) is build upon this project and demonstrates many uses.  
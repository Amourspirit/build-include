# Include Json read contents first

## BUILD_INCLUDE

<div class="nowrapcode">

```js
const jData = "BUILD_INCLUDE(actors.json)";
```

</div>

### Config

Contents of file are passed to *buildInclude*.  
When contents are passed *buildInclude* will use the passed in contents.

````js
import { BuildProcess } from 'build-include/esm/BuildProcess';
import * as fs from 'fs';
import * as path from 'path';

const filePath = './includes/jsonJs.js';
const srcPath = path.join(__dirname, filePath);
const contents = fs.readFileSync(srcPath, 'utf8');

const bp = new BuildProcess();
const opt = {
  match: {
    kind: "buildIncludeQuote"
  }
};
const results = bp.buildInclude(contents, filePath, opt);
````

### Output

```js
const jData = {
  "Actors": [{
      "name": "Tom Cruise",
      "age": 56,
      "Born At": "Syracuse, NY",
      "Birthdate": "July 3, 1962",
      "photo": "https://jsonformatter.org/img/tom-cruise.jpg",
      "wife": null,
      "weight": 67.5,
      "hasChildren": true,
      "hasGreyHair": false,
      "children": [
        "Suri",
        "Isabella Jane",
        "Connor"
      ]
    },
    {
      "name": "Robert Downey Jr.",
      "age": 53,
      "Born At": "New York City, NY",
      "Birthdate": "April 4, 1965",
      "photo": "https://jsonformatter.org/img/Robert-Downey-Jr.jpg",
      "wife": "Susan Downey",
      "weight": 77.1,
      "hasChildren": true,
      "hasGreyHair": false,
      "children": [
        "Indio Falconer",
        "Avri Roel",
        "Exton Elias"
      ]
    }
  ]
};
```

File [actors.json](replacements/actors.json.html) is to be included in output file.

### Options

#### Match Kind: buildIncludeQuote

[[include:docs/enums/regexKind/buildIncludeQuote.md]]

[[include:includes/options/iopt.md]]
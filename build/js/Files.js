const fs = require("fs");
const path = require("path")

/**
 * Gets absolute path for dirPath
 * @param {string} root the root directory to resolve to if dirPath is relative.
 * @param {string} dirOrFilePath the path that may be relative or absolute.
 * @returns {string} Absolute path of dirPath
 */
const getAbsPath = (root, dirOrFilePath) => {
  let absPath = '';
  if (path.isAbsolute(dirOrFilePath) === true) {
    absPath = dirOrFilePath;
  } else {
    absPath = path.resolve(root, dirOrFilePath);
  }
  return absPath;
};

//#region isFilterFileMatchEnd
const getFilmatchFiltered = (filter, file) => {
  let result = true;
  if (filter) {
    result = false;
    if (typeof filter === 'string') {
      if (isEndsWithIgnoreCase(file, filter)) {
        result = true;
      }
    } else if (Array.isArray(filter)) {
      result = getFileMatchArrMatchFilter(filter, file);
    } else {
      result = true;
    }
  }
  return result;
}

const getFileMatchArrMatchFilter = (filter, file) => {
  let result = false;
  filter.some(match => {
    if (isEndsWithIgnoreCase(file, match)) {
      result = true;
      return true;
    }
    return false;
  });
  return result;
}
/**
 * Gets if a file matches filter.
 * @param {string} file 
 * @param {string| string[]} [filter] extension filter.
 * @returns If filter is omitted then true.
 * If file is empty or null then false;
 * Otherwise results of filter
 */
const isFilterFileMatchEnd = (file, filter) => {
  if (!file) {
    return false;
  }
  return getFilmatchFiltered(filter, file);
};

//#endregion isFilterFileMatchEnd

const isEndsWithIgnoreCase = (src, filter) => {
  if (src.toLowerCase().endsWith(filter.toLowerCase())) {
    return true;
  }
  return false
}

/**
 * Gets relative path for dirPath to root
 * @param {string} root the root directory to resolve to if dirPath is absolute.
 * @param {string} dirOrFilePath the path that may be relative or absolute.
 * @returns {string} relative path of dirPath to root.
 * 
 * @example
 * ```js
 * root = '/home/paul/Projects/myCoolProject';
 * dirOrFilePath = '/home/paul/Projects/myCoolProject/dist/esm';
 * result = 'dist/esm';
 * ```
 */
const getRelPath = (root, dirOrFilePath) => {
  let relPath = '';
  if (path.isAbsolute(dirOrFilePath) === true) {
    relPath = path.relative(root, dirOrFilePath);
  } else {
    relPath = dirOrFilePath;
  }
  return relPath;
};

exports.Files = class Files {
  /**
  * @typedef {(err:any, opts:{skip:boolean, source:string, target:string, dir: {make:boolean: recursive:boolean}}) => void} fileCopyCbType
  * @typedef {(err:any, opts:{skip:boolean, source:string, content:string }) => void} fileAppendCbType
 */



  /**
 * Gets all files in a directory recursivly
 * @param {strign} dirPath The directory to read recursivly.
 * @param {string| string[]} [filter] extension filter.
 * Can be string such as '.js' or string array such as ['.js','.mjs']
 * @param {string[]} [arrayOfFiles] Array of files to append to.
 * @returns {string[]} array of absolute file paths
 */
  static getAllFiles(dirPath, filter, arrayOfFiles) {
    const allFiles = fs.readdirSync(dirPath, { encoding: 'utf-8' });

    arrayOfFiles = arrayOfFiles || [];

    allFiles.forEach((file) => {
      if (Files.isDirectory(dirPath + path.sep + file)) {
        arrayOfFiles = Files.getAllFiles(dirPath + path.sep + file, filter, arrayOfFiles)
      } else {
        Files.pushOnAllFilesIfFilterMatch(dirPath, file, filter, arrayOfFiles);
      }
    })

    return arrayOfFiles
  };

  static pushOnAllFilesIfFilterMatch(dirPath, file, filter, arrayOfFiles) {
    const fileName = path.join(dirPath, path.sep, file);
    if (isFilterFileMatchEnd(fileName, filter)) {
      arrayOfFiles.push(fileName);
    }
  }

  /**
 * Get the absolute and relative paths as an object
 * @param {string} root the root directory to resolve to if dirPath is absolute.
 * @param {string} dirOrFilePath the path that may be relative or absolute.
 * @returns {{abs: string, rel: string}}
 * 
 * Example:
 * 
 * ```js
 * root = '/home/paul/Projects/myCoolProject';
 * dirOrFilePath = '/home/paul/Projects/myCoolProject/dist/esm';
 * result = {
 *  rel: 'dist/esm',
 *  abs: '/home/paul/Projects/myCoolProject/dist/esm'};
 * ```
 */
  static getAbsRelPaths(root, dirOrFilePath) {
    let absPath = getAbsPath(root, dirOrFilePath);
    let relPath = getRelPath(root, dirOrFilePath);
    return {
      abs: absPath,
      rel: relPath
    }
  }

  /**
  * Copies files from source to target recursivly with a callback for each file
  * @param {string} source source file path
  * @param {string} target sarget file path
  * @param {string| string[]} [filter] extension filter.
  * @param {fileCopyCbType} [cb] callback function
  * that can modify the source file and set if the file should be skipped.
  * 
  * @see {@link Files.copyFileSync}
  */
  static copyFolderRecursiveSync(source, target, filter, cb, opts) {
    // https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js
    filter = filter || [];
    cb = cb || null;
    opts = Files.copyFolderRecursiveOptsSetInternal(opts);
    opts.internal.recursiveCount++;
    let files = [];

    let targetFolder = Files.copyFolderRecursiveGetTargetFolder(opts, target, source);

    if (Files.isDirectory(source)) {
      files = fs.readdirSync(source);

      files.map(file => {
        const curSource = path.join(source, file);
        if (Files.isDirectory(curSource)) {
          Files.copyFolderRecursiveSync(curSource, targetFolder, filter, cb, opts);
        } else {
          if (isFilterFileMatchEnd(file, filter)) {
            Files.copyFileSync(curSource, targetFolder, cb);
          }
        }
      });
    }
  }

  static copyFolderRecursiveGetTargetFolder(opts, target, source) {
    let targetFolder;
    if (opts.internal.recursiveCount === 0) {
      targetFolder = target;
    } else {
      targetFolder = path.join(target, path.basename(source));
    }
    return targetFolder;
  }

  static copyFolderRecursiveOptsSetInternal(opts) {
    const o = opts || { internal: { recursiveCount: -1 } };
    if (!o.internal) {
      o.internal = { recursiveCount: -1 };
    }
    return o;
  }

  /**
   * Copies files from source to target with a callback
   * @param {string} source source file path
   * @param {string} target target file path
   * @param {fileCopyCbType} cb callback function
   * that can modify the source file and set if the file should be skipped.
   * 
   * @example
   * <caption>cb options default</caption>
   * ```
   * {
   *  skip: false,
   *  source: source,
   *  target: target,
   *  dir: {
   *    make: true,
   *    recursive: true
   * }
   * ```
   */
  static copyFileSync(source, target, cb) {
    const opts = {
      skip: false,
      source: source,
      target: target,
      dir: {
        make: true,
        recursive: true
      }
    };
    if (typeof cb === 'function') {
      cb(null, opts);
      if (opts.skip) {
        return;
      }
    }
    let targetPath = opts.target; // path.join(opts.target, path.basename(opts.source));

    let dirName = targetPath;
    // file does not exist yet; test for file with extension
    if (path.extname(dirName)) {
      dirName = path.dirname(dirName);
    }
    if (!fs.existsSync(dirName)) {
      if (opts.dir.make === true) {
        fs.mkdirSync(dirName, { recursive: opts.dir.recursive });
      } else {
        throw new Error('Directory does not exist: ' + dirName);
      }
    }
    fs.copyFileSync(opts.source, targetPath);
  }

  /**
  * Copies files from source to target recursivly with a callback for each file
  * @param {string} source source file path
  * @param {string} content text to append ot all files
  * @param {string| string[]} [filter] extension filter.
  * @param {fileAppendCbType} [cb] callback function
  * that can modify the source file and set if the file should be skipped.
  * 
  * @see {@link Files.copyFileSync}
  */
  static appendFolderRecursiveSync(source, content, filter, cb) {
    let files = [];

    if (Files.isDirectory(source)) {
      files = fs.readdirSync(source);
      files.map(file => {
        const curSource = path.join(source, file);
        if (Files.isDirectory(curSource)) {
          Files.appendFolderRecursiveSync(curSource, content, filter, cb);
        } else {
          if (isFilterFileMatchEnd(file, filter)) {
            Files.appendToFileSync(curSource, content, cb);
          }
        }
      });
    }
  }

  //#region appendToFileSync
  /**
   * Append to File with a callback
   * @param {string} source source file path
   * @param {string} content text to append to file
   * @param {fileAppendCbType} cb callback function
   * that can modify the source file and set if the file should be skipped.
   * 
   * @example
   * <caption>cb options default</caption>
   * ```
   * {
   *  skip: false,
   *  source: source,
   *  content: content
   * }
   * ```
   */
  static appendToFileSync(source, content, cb) {
    const opts = Files.getAppendToFileDefaults(source, content);
    if (Files.runAppendToFileCbSkip(cb, opts)) return;

    let fileContent = Files.getFileContentsFromDiskAndDelFile(opts.source);
    fileContent += opts.content;
    fs.writeFileSync(opts.source, fileContent, { encoding: "utf8" });
  }

  static runAppendToFileCbSkip(cb, opts) {
    if (typeof cb === 'function') {
      cb(null, opts);
      if (opts.skip)
        return true;
    }
    return false;
  }
  static getAppendToFileDefaults(source, content) {
    return {
      skip: false,
      source: source,
      content: content
    };
  }

  static getFileContentsFromDiskAndDelFile(source) {
    let fileContent = fs.readFileSync(source, "utf8");
    fs.unlinkSync(source);
    return fileContent;
  }
  //#endregion appendToFileSync

  /**
   * Gets if a path is a directory
   * @param {string} path the path to test if is directory
   * @returns true if directory; Otherwise false
   */
  static isDirectory(path) {
    try {
      const stat = fs.lstatSync(path);
      return stat.isDirectory();
    } catch (e) {
      // lstatSync throws an error if path doesn't exist
      return false;
    }
  }

  /**
   * Gets if a path is a file
   * @param {string} path the path to test if is file
   * @returns true if file; Otherwise false
   */
  static isFile(path) {
    try {
      const stat = fs.lstatSync(path);
      return stat.isFile();
    } catch (e) {
      // lstatSync throws an error if path doesn't exist
      return false;
    }
  }
}

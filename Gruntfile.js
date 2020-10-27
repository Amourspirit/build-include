(function () {
  "use strict";
  // Define your library strictly...
})();
module.exports = function (grunt) {
  const fs = require('fs');
  const path = require('path');
  const DistHelper = require('./build/js/DistHelper').DistHelper;
  const Files = require('./build/js/Files').Files;
  const writeExamplesReadmeIndex = require('./build/js/docs/examples.index.js').writeExamplesReadmeIndex;
  //#region methods
  function writeJsonType() {
    const targetFolder = process.env.OUT_SRC;
    let jsonContnent = '';
    if (process.env.TYPE === "commonjs") {
      jsonContnent = JSON.stringify(DistHelper.getDistCjsObj());
    } else if (process.env.TYPE === "module") {
      jsonContnent = JSON.stringify(DistHelper.getDistObjEsm());
    }
    // const jsonContnent = `{"type": "${process.env.TYPE}"}`;
    const fileName = 'package.json';
    const filePath = path.join(targetFolder, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    fs.writeFileSync(filePath, jsonContnent, { encoding: "utf8" });
  }

  const _getNodeMajor = () => {
    // https://www.regexpal.com/?fam=108819
    var s = process.version;
    var major = s.replace(/v?(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)/, '$1');
    return parseInt(major, 10);
  }
  //#region Setup Methods
  const getPkg = () => {
    const p = grunt.file.readJSON('package.json');
    const extendedPkg = { ...p };
    extendedPkg.PKG_SRC_DIR_TS = p._sourceDirTs.replace('{0}', p._sourceDir);
    extendedPkg.OUT_ES = p._outEsm.replace('{0}', p._out);
    extendedPkg.OUT = p._out;
    extendedPkg.CJS = "cjs";
    extendedPkg.MJS = "mjs";
    extendedPkg.OUT_SRC = path.join(p._out, extendedPkg.CJS)
    extendedPkg.OUT_D_TS = path.join(p._out, "types");
    extendedPkg.SCRATCH_NO_COMMENT = path.join(p._scratch, extendedPkg.CJS, 'nc');
    extendedPkg.SCRATCH_DIST = path.join(p._scratch, extendedPkg.CJS, 'dist');
    extendedPkg.SCRATCH_BUILD = path.join(p._scratch, "commonjs");

    return extendedPkg;
  }
  //#endregion

  //#endregion
  
  var isWin = process.platform === "win32";
  var nodeMajor = _getNodeMajor();
  const pkg = getPkg();

  //#region Envrioment setting Default
  const envDefault = {
    NODE_ENV: 'production',
    WORK_DIR: '',
    PKG_MODULE: () => {
      return pkg.module;
    },
    PKG_MAIN: () => {
      return pkg.main;
    },
    PKG_NAME: () => {
      return pkg.name;
    },
    PKG_SRC_DIR: () => {
      return pkg._sourceDir;
    },
    PKG_TYPE: () => {
      return pkg.typings;
    },
    OUT: pkg.OUT,
    OUT_SRC: pkg.OUT_SRC,
    SCRATCH: () => {
      return pkg._scratch;
    },
    SCRATCH_BUILD: pkg.SCRATCH_BUILD,
    PKG_SRC_DIR_TS: pkg.PKG_SRC_DIR_TS,
    TS_CONFIG: "tsconfig.json",
    OUT_D_TS: () => {
      return pkg.OUT_D_TS;
    },
    SCRATCH_NO_COMMENT: pkg.SCRATCH_NO_COMMENT,
    SCRATCH_DIST: pkg.SCRATCH_DIST,
    EXT: "js",
    TYPE: "commonjs"
  };
  //#endregion

  //#region Config

  //#region Init Options
  const config = {
    env: {
      build: {},
      buildes: {}
    },
    clean: {
      scratch: ['<%= SCRATCH %>'],
      out: ['<%= OUT %>'],
      out_d_ts: ['<%= OUT_D_TS %>/*.d.ts'],
      dirs: ['<%= SCRATCH %>', '<%= OUT %>'],
      docs: ['docs']
    },
    shell: {
      tsc: 'tsc -p <%= TS_CONFIG %>',
      typecheck: 'tsc --noEmit',
    },
    copy: {
      js: {
        expand: true,
        cwd: '<%= NO_COMMENT %>',
        src: '**/*.js',
        dest: '<%= OUT %>/'
      },
      docs_html: {
        expand: true,
        cwd: 'test/html',
        src: '**/*.html',
        dest: 'docs/',
      },
      scratch_dist: {
        expand: true,
        cwd: '<%= SCRATCH_DIST %>/',
        src: '**/*',
        dest: '<%= OUT_SRC %>/',
      },
      pkg: {
        src: './package.json',
        dest: '<%= OUT %>/',
      },
      license: {
        src: './LICENSE',
        dest: '<%= OUT %>/',
      },
      readme: {
        src: './Readme.md',
        dest: '<%= OUT %>/',
      }
    },
    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      plugin: ['<%= PKG_SRC_DIR_TS %>/**/*.ts']
    },
    remove_comments: {
      js: {
        options: {
          multiline: true, // Whether to remove multi-line block comments
          singleline: true, // Whether to remove the comment of a single line.
          keepSpecialComments: false, // Whether to keep special comments, like: /*! !*/
          linein: true, // Whether to remove a line-in comment that exists in the line of code, it can be interpreted as a single-line comment in the line of code with /* or //.
          isCssLinein: false // Whether the file currently being processed is a CSS file
        },
        cwd: '<%= SCRATCH_BUILD %>/',
        src: '**/*.js',
        expand: true,
        dest: '<%= OUT_SRC %>/'
      },
    },
    build_include: {
      default: {
        options: {
          match: {
            // kind: 'bracketInclude',
            kind: 'bracketIncludeMulti',
            path: './doc/'
          },
          comment: {
            type: 'singleAsterisk'
          },
          text: {
            indent: true
          },
          fence: {
            type: 'multiflex'
          },
          recursion: false,
          ignoreMissing: true
        },
        files: [{
          expand: true,
          cwd: '<%= SCRATCH_BUILD %>/',
          src: '**/*d.ts',
          dest: '<%= OUT_SRC %>/'
        }]
      },
      test: {
        options: {
          match: {
            // kind: 'bracketInclude',
            kind: 'bracketIncludeMulti',
            path: './doc/'
          },
          comment: {
            type: 'singleAsterisk'
          },
          fence: {
            type: 'strict'
          },
          text: {
            indent: true
          },
          recursion: false,
          ignoreMissing: true
        },
        files: [{
          expand: true,
          cwd: '<%= SCRATCH_BUILD %>/',
          src: '**/*d.ts',
          dest: '<%= SCRATCH %>/d/'
        }]
      }
    }
  };
  //#endregion Init Options

  //#region Environment Default
  const calcEnvDef = () => {
    const newEnv = {};
    for (const key in envDefault) {
      if (envDefault.hasOwnProperty(key)) {
        const setting = envDefault[key];
        if (typeof setting === 'function') {
          newEnv[key] = setting();
        } else {
          newEnv[key] = setting;
        }
      }
    }
    return newEnv;
  }
  const envDef = calcEnvDef();
  //#endregion Environment Default

  //#region Create Environment
  const createEnv = (changes) => {
    const newEnv = { ...envDef };
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        const cSetting = changes[key];
        if (typeof cSetting === 'function') {
          newEnv[key] = cSetting();
        } else {
          newEnv[key] = cSetting;
        }
      }
    }
    return newEnv;
  };
  config.env.build = createEnv({});
  config.env.buildes = createEnv({
    OUT: () => {
      // return pkg.OUT_ES;
      return pkg.OUT;
    },
    TS_CONFIG: "tsconfig.esm.json",
    EXT: 'js', // pkg.MJS,
    SCRATCH_BUILD: () => {
      return path.join(pkg._scratch, "esm");
    },
    SCRATCH_NO_COMMENT: () => {
      return path.join(pkg._scratch, pkg.MJS, 'nc');
    },
    SCRATCH_DIST : () => {
      return path.join(pkg._scratch, pkg.MJS, 'dist');
    },
    OUT_SRC: () => {
      return path.join(pkg._out, "esm")
    },
    TYPE: "module"
  });
  //#endregion Create Environment
  //#endregion Config

  //#region Init Config
  grunt.initConfig(config);
  //#endregion Init Config

  // #region grunt require and load npm task
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-build-include');
  grunt.loadNpmTasks('grunt-rename-util');
  //#endregion grunt require and load npm task

  //#region Register Task Constants
  grunt.registerTask('loadconst', 'Load constants', function () {
    for (const key in envDefault) {
      if (process.env.hasOwnProperty(key)) {
        grunt.config(key, process.env[key]);
      }
    }
  });

  grunt.registerTask('log-const', 'Logging constants', function () {
    for (const key in envDefault) {
      if (process.env.hasOwnProperty(key)) {
        grunt.log.writeln(key + ': ' + process.env[key].toString());
      }
    }
  });
  grunt.registerTask('CopyMaps', 'Copying Commonjs', function () {
    if (!process.env.SCRATCH_BUILD) {
      throw new Error('SCRATCH_BUILD enviroment var not set');
    }
    if (!process.env.SCRATCH_DIST) {
      throw new Error('SCRATCH_DIST enviroment var not set');
    }
    const src = process.env.SCRATCH_BUILD;
    const out = process.env.SCRATCH_DIST;
    // const src = source.substr(process.env.SCRATCH_BUILD.length);

    Files.copyFolderRecursiveSync(src, out, [".js.map"], function(err, opts) {
      if (err) {
        if (typeof err === 'string') {
          throw new Error(err);
        }
        if (err instanceof Error) {
          throw err;
        }
        throw new Error('An error has occured!');
      }
      let str = opts.target;
      if (opts.source.endsWith('.js.map')) {
        // this is not necessaryif process.env.EXT = js
        // the purpose is the rename map file from .js.map to EXT + map
        // this is used with outputting dist to  mjs and/or cjs
        str = path.basename(opts.source);
        str = str.substr(0, str.length - 7);
        str += '.' + process.env.EXT + '.map';

        opts.target = path.join(opts.target, str);
      } else {
        opts.skip = true;
      }
    });
  });
  grunt.registerTask('CopyAppendMap', 'Copying Commonjs', function () {
    if (!process.env.OUT_SRC) {
      throw new Error('process.env.OUT_SRC is not set');
    }
    Files.appendFolderRecursiveSync(process.env.OUT_SRC, '', ['.js'], function(err, opts) {
      if (err) {
        if (typeof err === 'string') {
          throw new Error(err);
        }
        if (err instanceof Error) {
          throw err;
        }
        throw new Error('An error has occured!');
      }
      let src = path.basename(opts.source);
      src = src.substr(0, src.length - 3);
      let ext = "." + process.env.EXT; // mjs or cjs
      if (!ext.startsWith('.')) {
        ext = '.' + ext;
      }
      src += ext;
      src += '.map';
      opts.content = '\n';
      opts.content += '//# sourceMappingURL=' + src;
      
    });
  });
  grunt.registerTask('WriteJson', 'Write Json', function () {
    writeJsonType();
  });

  grunt.registerTask('finalizeJsonPackage', 'Finalize Json Package', function () {
    DistHelper.finalizeJsonPkg(path.join(process.env.OUT, 'package.json'));
  });

  //#endregion Register Task Constants

  //#region Grunt Task Build
  grunt.registerTask('buildcjs', [
    'env:build',
    'loadconst',
    'log-const',
    'clean:dirs',
    'clean:out_d_ts',
    'tslint',
    'shell:tsc',
    'remove_comments:js',
    'CopyAppendMap', 
    'CopyMaps',
    'copy:scratch_dist',
    'build_include:default',
    'WriteJson',
    'copy:pkg'
  ]);

  grunt.registerTask('buildesm', [
    'env:buildes',
    'loadconst',
    'log-const',
    'tslint',
    'shell:tsc',
    'remove_comments:js',
    'CopyAppendMap',
    'CopyMaps',
    'copy:scratch_dist',
    'build_include:default',
    'WriteJson'
  ]);


  grunt.registerTask('build', [
    'buildcjs',
    'buildesm',
    'copy:readme',
    'copy:license',
    'finalizeJsonPackage'
  ]);

  grunt.registerTask('buildinc', [
    'env:build',
    'loadconst',
    'log-const',
    'build_include:test'
  ]);
  //#endregion Grunt Task Build

  // #region docs
  grunt.registerTask('write_example_index', 'Write example index', function () {
    writeExamplesReadmeIndex();
  });
  grunt.registerTask('gen_docs', 'Build Docs', function () {
    var done = this.async();
    grunt.log.writeln('Building Docs');
    // var cmd = 'typedoc --out docs ./src --mode modules --theme minimal';
    var cmd;
    if (isWin === true) {
      cmd = 'node_modules\\.bin\\typedoc.cmd';
    } else {
      cmd = 'node_modules/.bin/typedoc';
    }
    cmd += ' --options typedoc.json';
    require('child_process').exec(cmd, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
  grunt.registerTask('docs', [
    'clean:docs',
    'write_example_index',
    'gen_docs',
    'copy:docs_html'
  ]);
  // #endregion

};
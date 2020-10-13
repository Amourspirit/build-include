import * as fs from 'fs';
import mkdirp = require("mkdirp");
import * as path from 'path';
import { IOpt } from "../src/interface/projectInterfaces";
import { TestWorker } from "./worker";

const worker = new TestWorker(path.join(__dirname, '..', 'scratch/test'));
worker.verbose = false;
// set the default logger for output from BuidProcess
const logger: string = 'null'; // fancy, null or simple
const contains = (where: any, what: string): boolean => {
	const index: number = where.toString().indexOf(what);
	return index > -1;
}

const jsonDir = path.join(__dirname, 'json');
const outDir = worker.outPath;
const fixDir = path.join(__dirname, 'fixtures');
const copyTestFiles = () => {
	const testFiles: string[][] = [];
	testFiles.push(['fixtures/style.min.css', '../scratch/test/css/style.min.css']);
	testFiles.push(['fixtures/replace1.txt', '../scratch/test/replace1.txt']);
	// testFiles.push(['fixtures/sample01.js', '../scratch/test/sample_inline.js']);
	testFiles.map(pair => {
		const src = path.join(__dirname, pair[0]);
		const dest = path.join(__dirname, pair[1]);
		if (fs.existsSync(dest)) {
			fs.unlinkSync(dest);
		}
		fs.copyFileSync(src, dest);
	});
};
mkdirp.sync(path.join(outDir, 'css'));
copyTestFiles();

describe('Build Includ Plugin', function () {
	it('should write a simple file and replace the build_replace contents matching fixture simple_repalced.txt',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'simple.txt');
			const outPath = path.join(outDir, 'simple_replaced.txt');
			const comparePath = path.join(fixDir, 'simple_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();

		});
	
	it('should load the source file when buildinclude contents are set to empty string', (done) => {
		const p = path.join(jsonDir, 'simple.json');
		const opt: IOpt = worker.getOptions(p);
		opt.verbose = worker.verbose;
		worker.setOption(opt, 'logger', logger);
		worker.setOption(opt, 'readSrc', false);
		const inPath = path.join(fixDir, 'simple.txt');
		const outPath = path.join(outDir, 'simple_replaced.txt');
		const comparePath = path.join(fixDir, 'simple_replaced.txt');

		worker.doWork(inPath, outPath, opt);
		const src = fs.readFileSync(comparePath);
		const comp = fs.readFileSync(outPath);
		expect(src.equals(comp)).toBeTruthy();
		done();
	});

	it('Replace the build_replace contents matching fixture sample01_repalce01.js.\
\n\tthe file path should repace <rootDir> with the projects root directory\
\n\tasjstring is set with breakstring. This will cause the replacement to do an escaped breakString replacement.',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'sample02.js');
			const outPath = path.join(outDir, 'sample01_replaced02.js');
			const comparePath = path.join(fixDir, 'sample01_replaced01.js');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('Replace the build_replace contents matching fixture sample01_repalce01.js.\
\n\tthe replacement is a relitive path from where the file has beein copied\
\n\tasjstring is set with breakstring. This will cause the replacement to do an escaped breakString replacement.',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'sample01.js');
			const outPath = path.join(outDir, 'sample01_replaced01.js');
			const comparePath = path.join(fixDir, 'sample01_replaced01.js');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a textOpt file and replace the build_replace contents matching fixture textOpt_repalced.txt',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'textOpt.txt');
			const outPath = path.join(outDir, 'textOpt_replaced.txt');
			const comparePath = path.join(fixDir, 'textOpt_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a asJsString_replaced.txt file and replace the build_replace contents matching fixture asJsString_replaced.txt',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'asJsString.txt');
			const outPath = path.join(outDir, 'asJsString_replaced.txt');
			const comparePath = path.join(fixDir, 'asJsString_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a recursive03_replaced.txt file and replace the build_replace contents matching fixture recursive03_replaced.txt\
\n\tThis is a multi-level recursion test several levels deep',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'recursive03.txt');
			const outPath = path.join(outDir, 'recursive03_replaced.txt');
			const comparePath = path.join(fixDir, 'recursive03_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a recursive04_replaced.txt file and replace the build_replace contents matching fixture recursive04_replaced.txt\
\n\tThis is a skips all recursion on purpose due to setting',
		(done) => {
			const p = path.join(jsonDir, 'noRecursion.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'recursive03.txt');
			const outPath = path.join(outDir, 'recursive04_replaced.txt');
			const comparePath = path.join(fixDir, 'recursive04_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
	
	it('should write a asJsString_replaced.txt file and replace the build_replace contents matching fixture asJsString_replaced.txt\
	\n\tMany replacements will be ignored due to bad file paths.\
	\n\tTest ignoreMissing feature',
		(done) => {
			const p = path.join(jsonDir, 'ignoreMissing.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'simpleWithBadFile.txt');
			const outPath = path.join(outDir, 'simpleWithBadFile_replaced.txt');
			const comparePath = path.join(fixDir, 'simpleWithBadFile_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
	
	it('should write a commetsl01_replaced.txt file and replace the build_replace contents matching fixture commetsl01_replaced.txt',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'commetsl01.txt');
			const outPath = path.join(outDir, 'commetsl01_replaced.txt');
			const comparePath = path.join(fixDir, 'commetsl01_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a commentHash_replaced.txt file and replace the build_replace contents matching fixture commentHash_replaced.txt',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'commentHash.txt');
			const outPath = path.join(outDir, 'commentHash_replaced.txt');
			const comparePath = path.join(fixDir, 'commentHash_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
	it('should write a simple_escape_replaced.txt file and replace the build_replace contents matching fixture simple_escape_replaced.txt\
  \n\tThis test many different escapes such as \\& \\= \\, \\n \\] \\[ and more',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'simple_escape.txt');
			const outPath = path.join(outDir, 'simple_escape_replaced.txt');
			const comparePath = path.join(fixDir, 'simple_escape_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a simple_newline_replaced file and replace the build_replace contents matching fixture simple_newline_replaced.txt\
  \n\tThe regular expression looks for matches with a pattern of # build_include(./somefile.txt)\
  \n\t[options]\
  \n\tNOTE: the options are on a line below the initial build_include\
  \n\tThis test is to also check lf match',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'simple_newline.txt');
			const outPath = path.join(outDir, 'simple_newline_replaced.txt');
			const comparePath = path.join(fixDir, 'simple_newline_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file and replace the build_replace contents matching fixture simple_newline_replaced_crlf.txt\
  \n\tThe regular expression looks for matches with a pattern of # build_include(./somefile.txt)\
  \n\t[options]\
  \n\tNOTE: the options are on a line below the initial build_include\
  \n\tThis test is to also check crlf match',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'simple_newline_crlf.txt');
			const outPath = path.join(outDir, 'simple_newline_replaced_crlf.txt');
			const comparePath = path.join(fixDir, 'simple_newline_replaced_crlf.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using grunt kind option of buildIncludeSlash.\
  \n\tReplace the build_replace contents matching fixture textOpt_repalced.txt',
		(done) => {
			const p = path.join(jsonDir, 'buildIncludeSlash.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'textOpt.txt');
			const outPath = path.join(outDir, 'textOpt_slash_replaced.txt');
			const comparePath = path.join(fixDir, 'textOpt_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using grunt kind option of buildIncludeSlash.\
  \n\tIn this case the match will be set with a string value\
  \n\tReplace the build_replace contents matching fixture textOpt_repalced.txt',
		(done) => {
			const p = path.join(jsonDir, 'buildIncludeSlashStr.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'textOpt.txt');
			const outPath = path.join(outDir, 'textOpt_slash_replaced.txt');
			const comparePath = path.join(fixDir, 'textOpt_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using grunt kind option of buildIncludeSlash.\
  \n\tIn this case the match will be set with a numeric value\
  \n\tReplace the build_replace contents matching fixture textOpt_repalced.txt',
		(done) => {
			const p = path.join(jsonDir, 'matchnum.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'textOpt.txt');
			const outPath = path.join(outDir, 'textOpt_slash_replaced.txt');
			const comparePath = path.join(fixDir, 'textOpt_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using grunt kind option of buildIncludePound.\
  \n\tReplace the build_replace contents matching fixture simple_regex_replaced.txt',
		(done) => {
			const p = path.join(jsonDir, 'matchpound.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'regex_simple.txt');
			const outPath = path.join(outDir, 'regex_simple_pound_replaced.txt');
			const comparePath = path.join(fixDir, 'regex_simple_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using grunt kind option of buildIncludeHtml.\
  \n\tReplace the build_replace contents matching fixture simple_html_replaced.txt\
  \n\tThis test uses gruntfile-html.js',
		(done) => {
			const p = path.join(jsonDir, 'matchhtml.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'simple_html.txt');
			const outPath = path.join(outDir, 'simple_html_replaced.txt');
			const comparePath = path.join(fixDir, 'simple_html_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
	it('should write a file using grunt kind option of bracketInclude.\
  \n\tReplace the build_replace contents matching fixture includeBracket_replaced.txt\
  \n\tThis test also implement using path as part of the options',
		(done) => {
			const p = path.join(jsonDir, 'bracketInclude01.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'includeBracket.txt');
			const outPath = path.join(outDir, 'includeBracket_replaced.txt');
			const comparePath = path.join(fixDir, 'includeBracket_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using grunt kind option of bracketIncludeMulti.\
  \n\tReplace the build_replace contents matching fixture includeBracket_replaced.txt\
  \n\tThis is a simulation of replacing inline includes for comments in format of [[include:somefile]]\
  \n\tThis test also implement using path as part of the options',
		(done) => {
			const p = path.join(jsonDir, 'brackedinclude02.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'includeBracketMulti.txt');
			const outPath = path.join(outDir, 'includeBracketMulti_replaced.txt');
			const comparePath = path.join(fixDir, 'includeBracketMulti_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using grunt kind option of bracketIncludeMulti.\
  \n\tReplace the build_replace contents matching fixture includeBracketFence_replaced.txt\
  \n\tThis is a simulation of replacing inline includes for comments in format of [[include:somefile]]\
  \n\tFence is in grunt file of type strict',
		(done) => {
			const p = path.join(jsonDir, 'brackedinclude03.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'includeBracketFence.txt');
			const outPath = path.join(outDir, 'includeBracketFence_replaced.txt');
			const comparePath = path.join(fixDir, 'includeBracketFence_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
	
	it('should write a file using grunt kind option of bracketIncludeMulti with fence options in config.\
  \n\tReplace the build_replace removeing fences and matching fixture includeBracketFence02_replaced.txt\
  \n\tThis is a simulation of replacing inline includes for comments in format of [[include:somefile]]\
  \n\tFence is in grunt file of type strict',
		(done) => {
			const p = path.join(jsonDir, 'brackedinclude04.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'includeBracketFence.txt');
			const outPath = path.join(outDir, 'includeBracketFence02_replaced.txt');
			const comparePath = path.join(fixDir, 'includeBracketFence02_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using grunt fence option of strict.\
  \n\tReplace the build_replace contents matching fixture simple_fenced_replaced.txt\
  \n\tThis searches for fences ``` and omitts any formating from fenced text.',
		(done) => {
			const p = path.join(jsonDir, 'fence01.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'simple_fenced.txt');
			const outPath = path.join(outDir, 'simple_fenced_replaced.txt');
			const comparePath = path.join(fixDir, 'simple_fenced_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using inline fence options.\
  \n\tReplace the build_replace contents matching fixture simple_fenced_replaced.txt\
  \n\tThis searches for fences ``` and omitts any formating from fenced text.',
		(done) => {
			const p = path.join(jsonDir, 'fence01.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'fence_inline.txt');
			const outPath = path.join(outDir, 'fenced_inline_replaced.txt');
			const comparePath = path.join(fixDir, 'fenced_inline_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using fence multiflex options.\
  \n\tAlso Test text whiteSpaceLine options.\
  \n\tReplace the build_replace contents matching fixture fence_multi_replaced.txt\
  \n\tThis searches for various fences and applies settings based on inline build_include options',
		(done) => {
			const p = path.join(jsonDir, 'simple.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'fence_multi.txt');
			const outPath = path.join(outDir, 'fence_multi_replaced.txt');
			const comparePath = path.join(fixDir, 'fence_multi_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});

	it('should write a file using gruntfile breakstring, asJsString and override\
  \n\tOverrides the value set for breakstring in fixtures/asJsString.txt\
  \n\tReplace the build_replace contents matching fixture gruntfile_asjsstring_replaced.txt',
		(done) => {
			const p = path.join(jsonDir, 'breakString01.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'asJsString.txt');
			const outPath = path.join(outDir, 'gruntfile_asjsstring_replaced.txt');
			const comparePath = path.join(fixDir, 'gruntfile_asjsstring_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
	
	it('should write a file using gruntfile breakstring option set to number.\
  \n\tReplace the build_replace contents matching fixture gruntfile_breakstring_style.txt',
		(done) => {
			const p = path.join(jsonDir, 'breakString02.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'gruntfile_breakstring_style.txt');
			const outPath = path.join(outDir, 'gruntfile_breakstring100_replaced.txt');
			const comparePath = path.join(fixDir, 'gruntfile_breakstring100_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
	it('should write a file using gruntfile breakstring option set to number.\
\n\tShould be encoded base64.\
\n\tBreakstring should start with [ and end with ]\
\n\tReplace the build_replace contents matching fixture gruntfile_breakstring_style.txt',
		(done) => {
			const p = path.join(jsonDir, 'breakString03.json');
			const opt: IOpt = worker.getOptions(p);
			opt.verbose = worker.verbose;
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'gruntfile_breakstring_style.txt');
			const outPath = path.join(outDir, 'gruntfile_breakstring70_replaced.txt');
			const comparePath = path.join(fixDir, 'gruntfile_breakstring70_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
});

describe("Test Missing", function () {
	it("should test missing include and handle gracefully", (done) => {
		const opt = { ignoreMissing: true };
		worker.setOption(opt, 'logger', logger);
		const inPath = path.join(fixDir, 'badfile.txt');
		const outPath = path.join(outDir, 'badfile_replaced.txt');
		const comparePath = path.join(fixDir, 'badfile.txt');

		worker.doWork(inPath, outPath, opt);
		const src = fs.readFileSync(comparePath);
		const comp = fs.readFileSync(outPath);
		expect(src.equals(comp)).toBeTruthy();
		done();
	});
	it("should test missing include and throw an error", (done) => {
		worker.setOption({}, 'logger', logger);
		const inPath = path.join(fixDir, 'badfile.txt');
		const outPath = path.join(outDir, 'badfile02_replaced.txt');
		expect(() => {
			worker.doWork(inPath, outPath, {})
		}).toThrow();
		done();
	});
});
describe("Test Relative Paths", function () {
	it("should test and include files that sit in a subdirectory relative to input file",
		(done) => {
			// const p = path.join(jsonDir, 'breakString02.json');
			const opt:IOpt = { verbose: worker.verbose};
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, 'simplesub.txt');
			const outPath = path.join(outDir, 'simplesub_replaced.txt');
			const comparePath = path.join(fixDir, 'simplesub_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
	it("should test a file in a subdirectory and include files that sit in a parent directory relativeive to input file",
		(done) => {
			// const p = path.join(jsonDir, 'breakString02.json');
			const opt: IOpt = { verbose: worker.verbose };
			worker.setOption(opt, 'logger', logger);
			const inPath = path.join(fixDir, '/sub/simple002.txt');
			const outPath = path.join(outDir, 'simple002_replaced.txt');
			const comparePath = path.join(fixDir, 'simple002_replaced.txt');

			worker.doWork(inPath, outPath, opt);
			const src = fs.readFileSync(comparePath);
			const comp = fs.readFileSync(outPath);
			expect(src.equals(comp)).toBeTruthy();
			done();
		});
});

describe('Relative Paths Test', function () {
	it('should load the source file when buildinclude contents are set to empty string', (done) => {
		const p = path.join(jsonDir, 'simple.json');
		const opt: IOpt = worker.getOptions(p);
		opt.verbose = worker.verbose;
		worker.setOption(opt, 'logger', logger);
		worker.setOption(opt, 'readSrc', false);
		const inPath = path.join("test", "fixtures", 'simple.txt');
		const outPath = path.join("/scratch","test", 'simple_replaced.txt');
		const comparePath = path.join(fixDir, 'simple_replaced.txt');

		worker.doWork(inPath, outPath, opt);
		const src = fs.readFileSync(comparePath);
		const comp = fs.readFileSync(worker.outFile);
		expect(src.equals(comp)).toBeTruthy();
		done();
	});
});
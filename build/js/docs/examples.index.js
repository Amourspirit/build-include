'use strict';
const fs = require('fs');
const path = require("path");
const rootRelative = '../../../';
const root = path.resolve(__dirname, rootRelative);
const pagesJsonFile = path.join(root, 'pagesconfig.json');

const pages = JSON.parse(fs.readFileSync(pagesJsonFile, { encoding: 'utf-8' }));

const readme = path.join(root, 'doc/pagesmd/examples/Readme.md');

const getPagesArray = () => {
	for (const key in pages) {
		if (pages.hasOwnProperty(key)) {
			const el = pages[key];
			if (Array.isArray(el)) {
				return el;
			}
		}
	}
};

const getExamplePages = () => {
	const mainPagesArray = getPagesArray();
	let result = null;
	if (!mainPagesArray) {
		return result;
	}
	mainPagesArray.some(obj => {
		if (obj.source && obj.source === 'examples'
			&& Array.isArray(obj.pages)) {
			result = obj.pages;
			return true;
		}
		return false;
	});
	return result;
};


const getExampleChildren = () => {
	const examplePagesArray = getExamplePages();
	let result = null;
	if (!examplePagesArray) {
		return result;
	}
	examplePagesArray.some(obj => {
		if (obj.title && obj.title == 'Examples'
			&& Array.isArray(obj.children)) {
			result = obj.children;
			return true;
		}
		return false;
	});
	return result;
};

const getExamplesList = () => {
	const pages = getExampleChildren();
	if (!pages) {
		return '';
	}
	let result = '## Contents\n\n';
	pages.map(page => {
		let line = "* [";
		line += page.title;
		line += "](";
		line += page.output.replace(/[\.]+\//, '');
		line += ")\n";
		result += line;
	});
	return result;
};

const writeExamplesReadmeIndex = () => {
	if (fs.existsSync(readme)) {
		fs.unlinkSync(readme);
	}
	const contents = getExamplesList();
	fs.writeFileSync(readme, contents, { encoding: "utf8" });
};
// console.log(pages);
// console.log(getExamplesList());
// writeReadmeIndex();

exports.writeExamplesReadmeIndex = writeExamplesReadmeIndex;

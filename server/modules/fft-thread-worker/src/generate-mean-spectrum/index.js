const path = require('path');

const { readInFolder } = require('./decoder');
const { readOutFolder, clearOutFolder } = require('./calculate-mean');
const folderName = process.argv[2] || 'nerve';
const assetsPath = path.resolve(__dirname, './', 'assets', folderName);

const calculate = async() => {
	try {
		await clearOutFolder(assetsPath);
		console.log('--> cleaned')
		await readInFolder(assetsPath);
		console.log('--> decoded')
		await readOutFolder(assetsPath);
		console.log('--> calculated')
	} catch (e) {
		console.log(e);
	}
};

calculate();

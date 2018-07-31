const fs = require('fs');
const { keys, extend } = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');
const rimraf = require('rimraf');

const readOutFolder = (folderPath) => new Promise((resolve, reject) => {
	const outFolderPath = path.resolve(folderPath, './out');
	fs.readdir(outFolderPath, async (err, files) => {
		if (err) reject();

		const spectrumSums = [];
		let meanEnergy = 0;

		for (let i = 0; i < files.length; i++) {
			const filePath = path.resolve(outFolderPath, files[i]);
			const data = jsonfile.readFileSync(filePath);
			meanEnergy += data.energy;

			data.meanSpectrum.forEach((spectrum, i) => {
				if (!spectrumSums[i]) {
					spectrumSums[i] = spectrum;
				} else {
					const newItem = {};
					keys(spectrum).forEach(key =>
						extend(newItem, {
							[key]: spectrumSums[i][key] + spectrum[key],
						}));
					spectrumSums[i] = newItem;
				}
			});
		}

		const meanSpectrum = spectrumSums.map(s=> {
			const newItem = {};
			keys(s).forEach(key =>
				extend(newItem, { [key]: s[key] / files.length }));
			return newItem;
		});
		meanEnergy = meanEnergy / files.length;
		const meanFilePath = path.resolve(outFolderPath, 'mean.json');
		jsonfile.writeFileSync(meanFilePath, { energy: meanEnergy, meanSpectrum });
		resolve();
	});
});


const clearOutFolder = (folderPath) => new Promise((resolve, reject) => {
	const outFolderPath = path.resolve(folderPath, './out');
  if (!fs.existsSync(outFolderPath)){
    fs.mkdirSync(outFolderPath);
  }
	fs.readdir(outFolderPath, async (err, files) => {
		if (err) return reject(err);
		let removed = 0;
		if (!files.length) {
			return resolve();
		}
		for (let i = 0; i < files.length; i++) {
			const filePath = path.resolve(outFolderPath, files[i]);
			rimraf(filePath, () => {
				removed++;
				if(removed === files.length) {
					return resolve();
				}
			});
		}
	});
});


module.exports = { readOutFolder, clearOutFolder };
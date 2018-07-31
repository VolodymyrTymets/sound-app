const fs = require('fs');
const WavDecoder = require('wav-decoder');
const { range } = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');

const { fft, spliceSpectrum } = require('../utils/fft');
const { getSpectrumEnergy } = require('../utils/get-spectrum-energy');
const { config } = require('../../config');


const decode = filePath => {
	const readFile = filepath => {
		return new Promise((resolve, reject) => {
			fs.readFile(filepath, (err, buffer) => {
				if (err) {
					return reject(err);
				}
				return resolve(buffer);
			});
		});
	};

	return readFile(filePath).then((buffer) => {
		return WavDecoder.decode(buffer);
	});
};

const decodeSingleIn = async (folderPath, fileName) => {
	const inFilePath = path.resolve(folderPath,  fileName);
	const outFilePath = path.resolve(folderPath, '../out', `${fileName}.json`);

	const audioData = await decode(inFilePath);

	const wave = audioData.channelData[0];
	const { spectrum } = fft(wave);
	const { splicedSpectrum } = spliceSpectrum(spectrum);
	const res = [];

	range(config.N, splicedSpectrum.length).forEach(() => res.push({
		frequency:0, amplitude: 0,
	}));
	splicedSpectrum.forEach(x=> res.push(x));
	const energy = getSpectrumEnergy(spectrum, 10);
	jsonfile.writeFileSync(outFilePath, { energy, meanSpectrum: res});
};


const readInFolder = (folderPath) => new Promise((resolve, reject) => {
	const inFolderPath = path.resolve(folderPath, './in');
	fs.readdir(inFolderPath, async (err, files) => {
		if (err) reject();
		for (let i = 0; i < files.length; i++) {
			try {
				await decodeSingleIn(inFolderPath, files[i]);
			} catch (e) {
				reject(e);
			}
		}
		resolve();
	});
});


module.exports = { readInFolder };
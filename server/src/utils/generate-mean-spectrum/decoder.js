const fs = require('fs');
const WavDecoder = require('wav-decoder');
const Json2csvParser = require('json2csv').Parser;
const { range, extend } = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');
// const { fft, spliceSpectrum } = require('../fft/utils/fft');
// const { getSpectrumEnergy } = require('../fft/utils/get-spectrum-energy');

const { fft, spliceSpectrum } = require('../fft/utils/fft-test');
const { getSpectrumEnergy } = require('../fft/utils/get-spectrum-energy-test');
const { config } = require('../fft/config');

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
	// by fourier-transform
	const wave = audioData.channelData[0];
	const { spectrum } = fft(wave);
	const { splicedSpectrum, maxIndex } = spliceSpectrum(spectrum);
  const energy = getSpectrumEnergy(spectrum, maxIndex, 10);
	const res = [];

	// by frequencyjs
	// range(config.N, splicedSpectrum.length).forEach(() => res.push({
	// 	frequency:0, amplitude: 0,
	// }));
	// splicedSpectrum.forEach(x=> res.push(x));
	// const energy = getSpectrumEnergy(spectrum, maxIndex, 10);
	// console.log('energy ->', energy)
	// jsonfile.writeFileSync(outFilePath, { energy, meanSpectrum: res});

	return { spectrum:splicedSpectrum, energy };

};


const readInFolder = (folderPath) => new Promise((resolve, reject) => {
	const inFolderPath = path.resolve(folderPath, './in');
	fs.readdir(inFolderPath, async (err, files) => {
		if (err) reject();
		const spectrums = [];
    const energies = [];

		for (let i = 0; i < files.length; i++) {
			try {
				const { spectrum, energy } =
				await decodeSingleIn(inFolderPath, files[i]);
				energies.push(energy);
				spectrums.push(spectrum);
			} catch (e) {
				reject(e);
			}
		}
		console.log(energies);
		const spectName = 'spectrums';
    const enName = 'energies';
    // write csv
    const outFilePathCSV = name => path.resolve(folderPath, './out', `${name}.csv`);
    const parser = new Json2csvParser();//{ fields: ['point', 'amplitude', 'energy'] });
    const csv = parser.parse(spectrums);
    fs.writeFileSync(outFilePathCSV(spectName), csv,  { encoding: 'utf8' });

    const parserEn = new Json2csvParser({ fields: ['energy'] });
    const csvEn = parserEn.parse(energies.map(e => ({ energy:  e })));
    fs.writeFileSync(outFilePathCSV(enName), csvEn,  { encoding: 'utf8' });
		resolve();
	});
});


module.exports = { readInFolder };
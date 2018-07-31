const { range } = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');

const { decode } = require('./decoder');
const { fft, spliceSpectrum } = require('../fft');
const { getSpectrumEnergy } = require('../get-spectrum-energy');
const { config } = require('../../config');

const inFilePath = path.resolve(__dirname, './', 'assets/in', '1.wav');
const outFilePath = path.resolve(__dirname, './', 'assets/out', '1.json');

decode(inFilePath)
	.then(audioData => {
		const wave = audioData.channelData[0];
		const { spectrum } = fft(wave);
		const splicedSpectrum = spliceSpectrum(spectrum);
		const res = [];

		range(config.N, splicedSpectrum.length).forEach(() => res.push({
			frequency:0, amplitude: 0,
		}));
		splicedSpectrum.forEach(x=> res.push(x));
		const energy = getSpectrumEnergy(spectrum, 10);

		console.log(res.length);
		jsonfile.writeFile(outFilePath, { energy, meanSpectrum: res} , (err) => {
			if (err) console.error(err);
			console.log('spectrum successfully added for:');
			console.log('--->' , outFilePath);
		});
	})
	.catch(console.log);
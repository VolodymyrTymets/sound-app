const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const WavDecoder = require('wav-decoder');
const { getSpectrumEnergyTest } = require('./src/utils/fft/utils/get-spectrum-energy-test');
const { fftTest, spliceSpectrumTest } = require('./src/utils/fft/utils/fft-test');
const { getSpectrumEnergy } = require('./src/utils/fft/utils/get-spectrum-energy');
const { fft, spliceSpectrum } = require('./src/utils/fft/utils/fft');


const filePath = path.resolve(__dirname, './public/assets', 'track.wav');


fs.readFile(filePath, (err, buffer) => {
	if (err) {
		return console.log(err)
	}
	WavDecoder.decode(buffer)
		.then(audioData => {

			const wave = audioData.channelData[0];

			try {

				console.time("fft");
				const { spectrum } = fft(wave);
				const { splicedSpectrum, maxIndex } = spliceSpectrum(spectrum);
				const energy = getSpectrumEnergy(spectrum, maxIndex, 10);
				console.timeEnd("fft");
				console.log("fft maxIndex ->", maxIndex);
				console.log("fft maxamplitude ->", spectrum[maxIndex]);
				console.log("energy ->", energy);


				console.time("fft");
				const spectrumTest = fftTest(wave);
				const spliceSpectrumTestRes = spliceSpectrumTest(spectrumTest.spectrum);
				console.log("fft maxIndex ->", spliceSpectrumTestRes.maxIndex);
				console.log("fft maxamplitude ->", spectrumTest.spectrum[spliceSpectrumTestRes.maxIndex]);

				const energyTest = getSpectrumEnergyTest(spectrumTest.spectrum, spliceSpectrumTestRes.maxIndex, 10);
				console.timeEnd("fft");

				console.log("energyTest ->", energyTest);

			} catch (e) {
				console.log(e)
			}
		})
		.catch(console.log);
});

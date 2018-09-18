const { fft, spliceSpectrum } = require('./utils/fft');
const { getSpectrumEnergy } = require('./utils/get-spectrum-energy');

const { fftTest, spliceSpectrumTest } = require('./utils/fft-test');
const { getSpectrumEnergyTest } = require('./utils/get-spectrum-energy-test');

const { getSimilarity } = require('./utils/similarity');
const { getTissueType } = require('./utils/tisue-type-getter');
const { config } = require('./config');

const getSpectrumInfo = (wave, minEnergy) => {
	// console.time("fft");
	// const { spectrum } = fft(wave);
	// // to pass for client only 40 point of spectrum;
	// const { splicedSpectrum, maxIndex } = spliceSpectrum(spectrum);
	// const energy = getSpectrumEnergy(spectrum, maxIndex, 10);
	// const tissueType = getTissueType(spectrum, energy, minEnergy);
	// console.timeEnd("fft");



	console.time("ffttest");
	const spectrumTest = fftTest(wave);
	const spliceSpectrumTestRes = spliceSpectrumTest(spectrumTest.spectrum);
	const energyTest = getSpectrumEnergyTest(spectrumTest.spectrum, spliceSpectrumTestRes.maxIndex, 10);
	const tissueType = getTissueType(spectrumTest.spectrum, energyTest, minEnergy);
	console.timeEnd("ffttest");

	// return {
	// 	// 	energy, spectrum: splicedSpectrum, similarity: 0, tissueType,
	// 	// 	test: {
	// 	// 		energy: energyTest,
	// 	// 		spectrum: spliceSpectrumTestRes.splicedSpectrum
	// 	// 	}
	// 	// };

	return { energy: energyTest, spectrum: spliceSpectrumTestRes.splicedSpectrum, tissueType }
};

module.exports = { getSpectrumInfo, config };
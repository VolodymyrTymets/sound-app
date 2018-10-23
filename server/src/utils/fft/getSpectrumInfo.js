// const { fft, spliceSpectrum } = require('./utils/fft');
// const { getSpectrumEnergy } = require('./utils/get-spectrum-energy');

const { fft, spliceSpectrum } = require('./utils/fft-test');
const { getSpectrumEnergy } = require('./utils/get-spectrum-energy-test');

const { getSimilarity } = require('./utils/similarity');
const { getTissueType } = require('./utils/tisue-type-getter');
const { config } = require('./config');

const getSpectrumInfo = (wave, minEnergy) => {
	// by frequencyjs
	// console.time("fft");
	// const { spectrum } = fft(wave);
	// // to pass for client only 40 point of spectrum;
	// const { splicedSpectrum, maxIndex } = spliceSpectrum(spectrum);
	// const energy = getSpectrumEnergy(spectrum, maxIndex, 10);
	// const tissueType = getTissueType(spectrum, energy, minEnergy);
	// console.timeEnd("fft");


  // by fourier-transform
	console.time("ffttest");
	const spectrum = fft(wave);
	const spliceSpectrumRes = spliceSpectrum(spectrum.spectrum);
	const energy = getSpectrumEnergy(spectrum.spectrum, spliceSpectrumtRes.maxIndex, 10);
	const tissueType = getTissueType(spectrum.spectrum, energy, minEnergy);
	console.timeEnd("ffttest");

	// return {
	// 	// 	energy, spectrum: splicedSpectrum, similarity: 0, tissueType,
	// 	// 	test: {
	// 	// 		energy: energyTest,
	// 	// 		spectrum: spliceSpectrumTestRes.splicedSpectrum
	// 	// 	}
	// 	// };

	return { energy, spectrum: spliceSpectrumRes.splicedSpectrum, tissueType }
};

module.exports = { getSpectrumInfo, config };
// const { fft, spliceSpectrum } = require('./utils/fft');
// const { getSpectrumEnergy } = require('./utils/get-spectrum-energy');

const { fft, spliceSpectrum } = require('./utils/fft-faster');
const { getSpectrumEnergy } = require('./utils/get-spectrum-energy-faster');

const { getTissueType } = require('./utils/tisue-type-getter');
const { config } = require('./config');

const getSpectrumInfo = (wave, minEnergy) => {
	// by frequencyjs
	// const { spectrum } = fft(wave);
	// // to pass for client only 40 point of spectrum;
	// const { splicedSpectrum, maxIndex } = spliceSpectrum(spectrum);
	// const energy = getSpectrumEnergy(spectrum, maxIndex, 10);
	// const tissueType = getTissueType(spectrum, energy, minEnergy);


  // by fourier-transform
	const spectrum = fft(wave);
	const spliceSpectrumRes = spliceSpectrum(spectrum.spectrum);
	const energy = getSpectrumEnergy(spectrum.spectrum, spliceSpectrumtRes.maxIndex, 10);
	const tissueType = getTissueType(spectrum.spectrum, energy, minEnergy);

	return { energy, spectrum: spliceSpectrumRes.splicedSpectrum, tissueType }
};

module.exports = { getSpectrumInfo, config };
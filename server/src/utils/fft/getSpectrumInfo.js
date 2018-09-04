const { fft, spliceSpectrum } = require('./utils/fft');
const { getSpectrumEnergy } = require('./utils/get-spectrum-energy');
const { getSimilarity } = require('./utils/similarity');
const { getTissueType } = require('./utils/tisue-type-getter');
const { config } = require('./config');

const getSpectrumInfo = (wave, minEnergy) => {
	const { spectrum } = fft(wave);

	// to pass for client only 40 point of spectrum;
	const { splicedSpectrum, maxIndex } = spliceSpectrum(spectrum);
	// const similarity = getSimilarity(config.meanSpectrum, splicedSpectrum, x => x.amplitude);
	const energy = getSpectrumEnergy(spectrum, maxIndex, 10);
	const tissueType = getTissueType(spectrum, energy, minEnergy);

	return { energy, spectrum: splicedSpectrum, similarity: 0, tissueType };
};

module.exports = { getSpectrumInfo, config };
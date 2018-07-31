const { fft, spliceSpectrum } = require('./fft');
const { getSpectrumEnergy } = require('./utils/get-spectrum-energy');
const { getSimilarity } = require('./utils/similarity-array');
const { getTissueType } = require('./utils//tisue-type-getter');
const { config } = require('../config');

const getSpectrumInfo = (wave, done) => {
	const { spectrum } = fft(wave);

	// to pass for client only 40 point of spectrum;
	const { splicedSpectrum, maxIndex } = spliceSpectrum(spectrum);
	const similarity = getSimilarity(config.meanSpectrum, splicedSpectrum, x => x.amplitude);
	const energy = getSpectrumEnergy(spectrum, maxIndex, 10);
	const tissueType = getTissueType(spectrum, energy);

	done({ energy, spectrum: splicedSpectrum, similarity, tissueType });
};

module.exports = { getSpectrumInfo, config };
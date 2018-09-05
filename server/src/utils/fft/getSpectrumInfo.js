const { fft, spliceSpectrum } = require('./utils/fft');
const { getSpectrumEnergy } = require('./utils/get-spectrum-energy');
const { getSimilarity } = require('./utils/similarity');
const { getTissueType } = require('./utils/tisue-type-getter');
const { config } = require('./config');

const getSpectrumInfo = (wave, minEnergy) => {
  console.time("fft");
	const { spectrum } = fft(wave);
  console.timeEnd("fft");

	// to pass for client only 40 point of spectrum;
  console.time("spliceSpectrum");
	const { splicedSpectrum, maxIndex } = spliceSpectrum(spectrum);
	// const similarity = getSimilarity(config.meanSpectrum, splicedSpectrum, x => x.amplitude);
  console.timeEnd("spliceSpectrum");
  console.time("energy");
	const energy = getSpectrumEnergy(spectrum, maxIndex, 10);
  console.timeEnd("energy");
	const tissueType = getTissueType(spectrum, energy, minEnergy);

	return { energy, spectrum: splicedSpectrum, similarity: 0, tissueType };
};

module.exports = { getSpectrumInfo, config };
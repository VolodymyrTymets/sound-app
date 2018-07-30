const { fft, spliceSpectrum } = require('./fft');
const { getSpectrumEnergy } = require('./get-spectrum-energy');
const { getSimilarity } = require('./similarity-array');
const { getTissueType } = require('./tisue-type-getter');
const { config } = require('../config');

const getSpectrumInfo = (wave, done) => {
  const { spectrum } = fft(wave);

  // to pass for client only 40 point of spectrum;
  const splicedSpectrum = spliceSpectrum(spectrum);
  const similarity = getSimilarity(config.meanSpectrum, splicedSpectrum, x => x.amplitude);
  const energy = getSpectrumEnergy(spectrum, 10);
  const tissueType = getTissueType(spectrum, energy);

  done({ energy, spectrum: splicedSpectrum, similarity, tissueType });
};

module.exports = { getSpectrumInfo };
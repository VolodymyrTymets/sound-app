const { fft, spliceSpectrum } = require('./fft');
const { getSpectrumEnergy } = require('./get-spectrum-energy');

const getSpectrumInfo = (wave, done) => {
  const { spectrum } = fft(wave);
  const energy = getSpectrumEnergy(spectrum, 10);
  // to pass for client only 40 point of spectrum;
  const splicedSpectrum = spliceSpectrum(spectrum, 40);
  done({ energy, spectrum: splicedSpectrum });
};

module.exports = { getSpectrumInfo };
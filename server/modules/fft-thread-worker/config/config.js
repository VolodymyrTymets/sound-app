const meanSpectrum = require('./_meanSpectrum');

module.exports = {
  meanSpectrum: meanSpectrum.meanSpectrum,
  meanEnergy: meanSpectrum.energy,
  N: 40, // points to compare
};
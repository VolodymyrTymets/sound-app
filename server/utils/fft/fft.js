const _ = require('lodash');
const math = require('mathjs');
const fjs = require("frequencyjs");

function nearestPow2( aSize ){
  return Math.pow( 2, Math.round( Math.log( aSize ) / Math.log( 2 ) ) );
}

const spliceSpectrum = (spectrum, count = 20) => {
  const max = _.maxBy(spectrum, v => v.amplitude);
  const maxIndex = _.findIndex(spectrum, v => v.amplitude === max.amplitude);
  const min = (maxIndex - count) > 0 ? (maxIndex - count) : 0;
  return spectrum.splice(min, count * 2);
};


const fft = (wave) => {
  let waveLength = wave.length;
  let index = nearestPow2(waveLength);

  while (!(index <= wave.length)) {
    waveLength = waveLength - 2;
    index = nearestPow2(waveLength)
  }

  const cutedWave = wave.slice(0, index);
  const spectrum = fjs.Transform.toSpectrum(cutedWave, { method: 'fft'} );
  return { wave: _.values(cutedWave), spectrum };
};

module.exports = { fft, spliceSpectrum };

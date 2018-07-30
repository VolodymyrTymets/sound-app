const { findIndex, maxBy } = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');

const { decode } = require('./decoder');
const { fft } = require('../fft');

const inFilePath = path.resolve(__dirname, './', 'assets/in', '1.wav');
const outFilePath = path.resolve(__dirname, './', 'assets/out', '1.json');
const N = 20;

decode(inFilePath)
  .then(audioData => {
    const wave = audioData.channelData[0];
    const { spectrum } = fft(wave);

    const maxSpectrum = maxBy(spectrum, s => s.amplitude);
    const maxIndex = findIndex(spectrum,
        s => s.amplitude === maxSpectrum.amplitude);

    const from = maxIndex - (N / 2) || 0;
    const to = maxIndex + (N / 2);
    const spliceSpectrum = spectrum.slice(from, to);

    jsonfile.writeFile(outFilePath, spliceSpectrum, (err) => {
      if (err) console.error(err)
      console.log(`[${spectrum[maxIndex].amplitude}] spectrum successfully added for:`);
      console.log('--->' , outFilePath);
    });
  })
  .catch(console.log);
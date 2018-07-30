const { indexOf, max } = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');

const { decode } = require('./decoder');
const { fft } = require('../fft');

const inFilePath = path.resolve(__dirname, '../', 'private', fileName);
const outFilePath = path.resolve(__dirname, '../', 'private', fileName);
const N = 20;

decode(filePath)
  .then(audioData => {
    const wave = audioData.channelData[0];
    const { spectrum } = fft(wave);
    const maxIndex = indexOf(spectrum, max(spectrum));
    const from = maxIndex =  maxIndex - (N / 2) || 0;
    const to = maxIndex =  maxIndex + (N / 2);
    const spliceSpectrum =  spectrum.slice(from, to);

    jsonfile.writeFile(outFilePath, spliceSpectrum, (err) => {
      /* eslint-disable */
      if (err) console.error(err)
      console.log(`[${spectrum[maxIndex]}] spectrum successfully added for:`);
      console.log('--->' , outFilePath)
      /* eslint-disable */
    });
  })
  .catch(console.log);
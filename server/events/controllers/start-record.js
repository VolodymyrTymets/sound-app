const _ = require('lodash');
const { mic_data, find_segment } = require('../event-names');
const mic = require('../../utils/Mic');
const { Segmenter } = require('../../utils/segmenter');
const { getTissueType } = require('../../utils/tissue-type-getter');
const { fftThreadWorker } = require('../../utils/FFT');

const skipArrayElements = (array, step = 4) => {
  const res = [];
  for (let index = 0; index < array.length; index = index + step) {
    res.push(array[index]);
  }
  return res;
};

const startRecord = client => () => {
  let waves = [];
  const segmenter = new Segmenter();

  mic.start((audioData, buffer) => {
    const wave = audioData.channelData[0];
    waves.push(wave);
    if (waves.length === 11) {
      const waveToClient = _.flatten(waves.map(w => skipArrayElements(w)));
      client.emit(mic_data, waveToClient);
      waves = [];
    }
    segmenter.findSegment(wave, 11, buffer); //min should be 11 waves = 1 second
  });

  segmenter.on('segment', (segment, average) => {
    const segmentToClient = skipArrayElements(segment);

    fftThreadWorker.start(segment, (response) => {
      const { spectrum, energy } = response;
      const tissueType = getTissueType(spectrum, energy);

      client.emit(find_segment, {
        average,
        energy,
        tissueType,
        spectrum,
        segment: segmentToClient,
      });
    });
  });
};

module.exports = startRecord;
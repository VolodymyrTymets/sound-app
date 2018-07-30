const _ = require('lodash');
const { mic_data, find_segment } = require('../event-names');
const mic = require('../../utils/Mic');
const { Segmenter } = require('../../utils/segmenter');
const { fft, spliceSpectrum } = require('../../utils/fft');
const { getSpectrumEnergy } = require('../../utils/spectrum-energy');
const { getTissueType } = require('../../utils/tissue-type-getter');
const WAVE_SKIP_STEP = 4;

const sendSegmentRes = ({ segment, spectrum, average, energy, tissueType }, client) => {
  const segmentToClient = [];
  for(let index = 0; index < segment.length; index = index + WAVE_SKIP_STEP) {
    segmentToClient.push(segment[index]);
  }
  client.emit(find_segment, {
    average,
    energy,
    tissueType,
    segment: segmentToClient,
    spectrum: spliceSpectrum(spectrum, 40),
  });
};

const sendRecordRes = (waves, client) => {
  const waveToClient = [];
  waves.forEach(wave => {
    for(let index = 0; index < wave.length; index= index + WAVE_SKIP_STEP) {
      waveToClient.push(wave[index]);
    }
  });
  client.emit(mic_data, waveToClient)
};


const startRecord = client => () => {
  let waves = [];
  const segmenter = new Segmenter();

  mic.start((audioData, buffer) => {
    const wave = audioData.channelData[0];
    waves.push(wave);
    if (waves.length === 11) {
      sendRecordRes(waves, client);
      waves = [];
    }
    segmenter.findSegment(wave, 11, buffer); //min should be 11 waves = 1 second
  });

  segmenter.on('segment', (segment, average) => {

    const { spectrum } = fft(segment);
    const energy = getSpectrumEnergy(spectrum, 10);
    console.log(`find segment -> [${segment.length}] energy [${energy}]`, );
    const tissueType = getTissueType(spectrum, energy);
    sendSegmentRes({ segment, spectrum, average, energy, tissueType }, client);
  });
};

module.exports = startRecord;
const _ = require('lodash');
const { mic_data, find_segment } = require('../event-names');
const mic = require('../../utils/Mic');
const { Segmenter } = require('../../utils/segmenter');
const { fft, spliceSpectrum } = require('../../utils/fft');


const WAVE_SKIP_STEP = 4;

const sendSegmentRes = ({ segment, spectrum, average }, client) => {
  const segmentToClient = [];
  for(let index = 0; index < segment.length; index= index + WAVE_SKIP_STEP) {
    segmentToClient.push(segment[index]);
  }
  client.emit(find_segment, {
    average,
    segment: segmentToClient,
    spectrum: spliceSpectrum(spectrum, 40)
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


const startRecord = client => data => {

  global.config.mic.device = _.isUndefined(data.settings.mic) && global.config.mic.device || `plughw:${data.settings.mic}`;
  global.config.LIMIT_OF_SILENCE = parseFloat(data.settings.segmentationValue) || global.config.LIMIT_OF_SILENCE;
  global.config.FILE_NAME = data.settings.fileName;

  console.log(global.config)

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
    console.log('startRecord.js segment.length ->', segment.length);
    const { spectrum } = fft(segment);
    sendSegmentRes({ segment, spectrum, average }, client);
  });
};

module.exports = startRecord;
const _ = require('lodash');
const { mic_data, find_segment } = require('../event-names');
const mic = require('../../utils/Mic');
const { Segmenter } = require('../../utils/segmenter');
const { fft, spliceSpectrum } = require('../../utils/fft');
const segmenter = new Segmenter();

const WAVE_SKIP_STEP = 4;

const sendSegmentRes = ({ segment, spectrum }, client) => {
  const segmentToClient = [];
  for(let index = 0; index < segment.length; index= index + WAVE_SKIP_STEP) {
    segmentToClient.push(segment[index]);
  }
  client.emit(find_segment, {
    segment: segmentToClient, spectrum: spliceSpectrum(spectrum, 40)});
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

segmenter.on('noSegment', () => {
});

const startRecord = client => data => {
  console.log('start-record', data)
  let waves = [];

  mic.start((audioData, buffer) => {
    const wave = audioData.channelData[0];
    waves.push(wave);
    if (waves.length === 8) {
      sendRecordRes(waves, client);
      waves = [];
    }
    segmenter.findSegment(wave, 8, buffer); //min should be 11 waves = 1 second
  });

  segmenter.on('segment', segment => {
    console.log('segment.length ->', segment.length);
    const { spectrum } = fft(segment);
    sendSegmentRes({ segment, spectrum }, client);
  });
};

module.exports = startRecord;
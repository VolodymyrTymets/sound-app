const _ = require('lodash');
const { mic_data, find_segment } = require('../event-names');
const mic = require('../../utils/Mic');
const { Segmenter } = require('../../utils/segmenter');
const { fft } = require('../../utils/fft');
const segmenter = new Segmenter();


const sendRecordRes = (waves, client) => {
  const waveToClient = [];
  waves.forEach(wave => {
    for(let index = 0; index < wave.length; index= index + 4) {
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
    if (waves.length === 11) {
      sendRecordRes(waves, client);
      waves = [];
    }
    segmenter.findSegment(wave, buffer);
  });

  segmenter.on('segment', segment => {
    console.log('segment.length ->', segment.length);
    const { spectrum } = fft(segment);
    client.emit(find_segment, { segment, spectrum });
  });
};

module.exports = startRecord;
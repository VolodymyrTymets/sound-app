const _ = require('lodash');
const { mic_data } = require('../event-names');
const mic = require('../../utils/Mic');


const sendRecordRes = (waves, client) => {
  const waveToClient = [];
  waves.forEach(wave => {
    for(let index = 0; index < wave.length; index= index + 4) {
      waveToClient.push(wave[index]);
    }
  });
  client.emit(mic_data, waveToClient)
};


const startRecord = client => data => {
  console.log('start-record', data)
  let waves = [];

  mic.start((audioData) => {
    const wave = audioData.channelData[0];
    waves.push(wave);
    if (waves.length ===11) {
      sendRecordRes(waves, client);
      waves = [];
    }
  });
};

module.exports = startRecord;
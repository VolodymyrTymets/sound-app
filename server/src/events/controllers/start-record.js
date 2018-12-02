const _ = require('lodash');
//const { Mic } = require('../../utils/Mic');
const mic = require('mic');

const startRecord = (client, config) => ({ settings }) => {
  const micConfig = {
    rate: 44100,
    channels: 2,
    debug: true,
    exitOnSilence: 6,
    device: `hw:0`,
  };
	console.log('mic ->', micConfig);
  const micInstance = mic(micConfig);
  const micInputStream = micInstance.getAudioStream();
  const { ss } = global;
  const stream = ss.createStream();
  ss(client).emit('mic-stream', stream, { settings });
  micInputStream.pipe(stream);
  micInputStream.on('data', data => {
    console.log('data ->', data.length)
  })
  micInputStream.on('error', err => {
    console.log('data ->', err);
    micInstance.stop();
  });
  micInstance.start();

  client.on('stop-record', () => {
    console.log('----> stop');
    micInstance.stop();
  });

  // setTimeout(() => {
  //   micInstance.stop();
  // }, 20000)

};

module.exports = startRecord;

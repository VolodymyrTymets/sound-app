const _ = require('lodash');
const mic = require('mic');
const WavDecoder = require('wav-decoder');
const header = require("waveheader");
const config = require('../config');

class Mic {
  _catch(error) {
    console.log('Mic ->');
    console.log(error);
  }
  _createInstance () {
    this._micInstance = mic(_.extend(config.mic, {
      // todo extend for raspi
      device: 'plughw:0',
    }));
    this._micInputStream = this._micInstance.getAudioStream();
    this._micInputStream.on('error', function(err) {
      console.log("Error in Input Stream: " + err);
    });
  }
  start(onData) {
    try {
      this._createInstance();
      this._micInputStream.on('data', buffer => {
        WavDecoder.decode(Buffer.concat([header(config.mic.rate), buffer]))
          .then(audioData => onData(audioData, buffer))
          .catch(this._catch);
      });

      this._micInstance.start();
    } catch (error) {
      this._catch(error);
    }
  }
  stop() {
    this._micInstance.stop();
  }
}
const micInstance = new Mic();

module.exports = micInstance;
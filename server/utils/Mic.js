const _ = require('lodash');
const mic = require('mic');
const WavDecoder = require('wav-decoder');
const header = require("waveheader");
const fs = require('fs');
const path = require('path');
const config = global.config;

class Mic {
  _catch(error) {
    console.log('Mic ->');
    console.log(error);
  }
  _createInstance () {
    delete  this._micInputStream;
    delete  this._micInstance;
    this._micInstance = mic(_.extend(config.mic, {
      debug: false,
    }));
    this._micInputStream = this._micInstance.getAudioStream();
    this._micInputStream.on('error', function(err) {
      console.log("Error in Input Stream: " + err);
    });
  }
  start(onData) {
    try {
      console.log('config.mic.device ->', config.mic.device)
      this._createInstance();
      this._micInputStream.on('data', buffer => {
        WavDecoder.decode(Buffer.concat([header(config.mic.rate), buffer]))
          .then(audioData => onData(audioData, buffer))
          .catch(this._catch);
      });

      if(global.config.FILE_NAME) {

        const dir = path.resolve(__dirname, '../assets/', global.config.FILE_NAME);
        console.log('dir ->', dir)
         if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        const outputFileStream = fs.WriteStream(path.resolve(dir,'output.wav'));

        this._micInputStream.pipe(outputFileStream);
      }

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
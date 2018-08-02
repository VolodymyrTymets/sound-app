const _ = require('lodash');
const mic = require('mic');
const WavDecoder = require('wav-decoder');
const header = require('waveheader');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const { storage } = require('../utils/storage');

class Mic {
	constructor(setting) {
		this._writeIntoFile = this._writeIntoFile.bind(this);
		this.log = this.log.bind(this);
		this._FILE_NAME = 'track.wav';
		this._micDevice = setting && setting.mic;
	}
	_writeIntoFile(startDate) {
		const outputFileStream = fs.WriteStream(path.resolve(storage.getFolderName(startDate), this._FILE_NAME));
		this._micInputStream.pipe(outputFileStream);
	}

	_createInstance () {
		delete  this._micInputStream;
		delete  this._micInstance;
		this._micInstance = mic(_.extend(config.mic, {
			debug: false,
      device: this._micDevice || config.mic.device,
		}));
		this._micInputStream = this._micInstance.getAudioStream();
		this._micInputStream.on('error', this.log);
	}
	log(message) {
		console.log(`-> [Mic]: ${message.message || message}`);
		if (message.message) {
			console.log(message);
		}
	}
	start(startDate, onData) {
		try {
			this._createInstance();
			this._micInputStream.on('data', buffer => {
				WavDecoder.decode(Buffer.concat([header(config.mic.rate), buffer]))
					.then(audioData => onData(audioData, buffer))
					.catch(this._catch);
			});

			this._writeIntoFile(startDate);

			this._micInstance.start();
		} catch (error) {
			this.log(error);
		}
	}
	stop() {
    this._micInstance && this._micInstance.stop();
	}
}


module.exports = { Mic };
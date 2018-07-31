const _ = require('lodash');
const mic = require('mic');
const WavDecoder = require('wav-decoder');
const header = require('waveheader');
const fs = require('fs');
const path = require('path');
const config = require('../config');

class Mic {
	constructor() {
		this._writeIntoFile = this._writeIntoFile.bind(this);
		this.log = this.log.bind(this);
	}
	_writeIntoFile(fileName) {
		const dir = path.resolve(__dirname, '../assets/');
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		const outputFileStream = fs.WriteStream(path.resolve(dir, fileName));
		this._micInputStream.pipe(outputFileStream);
	}

	_createInstance () {
		delete  this._micInputStream;
		delete  this._micInstance;
		this._micInstance = mic(_.extend(config.mic, {
			debug: false,
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
	start(onData) {
		try {
			this._createInstance();
			this._micInputStream.on('data', buffer => {
				WavDecoder.decode(Buffer.concat([header(config.mic.rate), buffer]))
					.then(audioData => onData(audioData, buffer))
					.catch(this._catch);
			});

			// this._writeIntoFile(process.env.FILE_NAME);

			this._micInstance.start();
		} catch (error) {
			this.log(error);
		}
	}
	stop() {
		this._micInstance.stop();
	}
}
const micInstance = new Mic();

module.exports = micInstance;
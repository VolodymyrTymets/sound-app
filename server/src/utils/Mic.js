const _ = require('lodash');
const moment = require('moment');
const mic = require('mic');
const WavDecoder = require('wav-decoder');
const header = require('waveheader');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { Storage } = require('../utils/storage');

class Mic {
	constructor(setting, config) {
		this._writeIntoFile = this._writeIntoFile.bind(this);
		this.log = this.log.bind(this);
		this._FILE_NAME = 'track.wav';
		this._micDevice = setting && setting.mic;
		this._config = config;
		this._storage = new Storage(config);
		this._startDate =  null;
    this._tissueTimes = [];

	}
	_writeIntoFile(startDate) {
		const outputFileStream = fs.WriteStream(path.resolve(this._storage.getFolderName(startDate), this._FILE_NAME));
		this._micInputStream.pipe(outputFileStream);
	}

	_createInstance () {
		delete  this._micInputStream;
		delete  this._micInstance;
		this._micInstance = mic(_.extend(this._config .mic, {
			debug: false,
      device: this._micDevice || this._config.mic.device,
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
	saveTissueTime(tissueType) {
		console.log('tissueType ->', tissueType)
		this._tissueTimes.push({ time: new Date(), type: tissueType });
	}
	start(startDate, onData) {
		try {
			this._startDate = startDate;
			this._createInstance();
			this._micInputStream.on('data', buffer => {
				WavDecoder.decode(Buffer.concat([header(this._config .mic.rate), buffer]))
					.then(audioData => onData(audioData))
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
    try {
			const folderName = path.resolve(this._storage.getFolderName(this._startDate));
			const trackPath = path.resolve(folderName, this._FILE_NAME);

			this._tissueTimes.forEach(t => {
				const duration = moment.duration(moment(t.time).diff(this._startDate));
				const to = duration.seconds();
				const from = to - 3 || 0;
				const out = path.resolve(folderName, `./${t.type}`);
				console.log('out ->', out)
        if(!fs.existsSync(out)) {
        	fs.mkdirSync(out)
				}
				const pieceName = `${duration.hours()}h-${duration.minutes()}m-${duration.seconds()}s.wav`;
        const piecePath = path.resolve(out, pieceName);
        console.log('piecePath ->', piecePath);

				exec(`ffmpeg -i ${trackPath} -ss ${from} -to ${to} -c copy ${piecePath}`, (error) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
				});
			});

		} catch (e) {
			console.log('Parse track error:');
			console.log(e);
		}
		this._startDate == null;
		this._tissueTimes = [];
		this._micInstance && this._micInstance.stop();
	}
}


module.exports = { Mic };
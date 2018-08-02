const _ = require('lodash');
const { EventEmitter } = require('events');
const header = require('waveheader');
const { storage } = require('../storage');
const config = require('../../config');
const fs = require('fs');

const N = 100;

/**
 * Provide filter wave
 * 
 * @example 
 *          const segmenter = new Segmenter();
            segmenter.on('segment', segment => {            
            });
            segmenter.findSegmant(wave)      
 **/
class Segmentor extends EventEmitter {
	constructor(startDate = new Date()) {
		super();
		this._waves = [];
		this._everages = [];
		this._limitOfSilence = 0;
		this._timetoLearn = 2000; // 4s
		this._startDate = startDate;
		// take every 4s limit of sielence
		setInterval(() => {
			this._limitOfSilence = _.mean(this._everages);
			this._everages = [];
		}, this._timetoLearn);

		this._buffers = new ArrayBuffer([]);
	}

	_saveSegment(buffer) {
		fs.writeFile(
			storage.getSegmentsFolder(this._startDate),
      Buffer.concat([header(config.mic.rate), buffer]), err => {
			if(err) {
				return console.log(err);
			}
		});
	}
	saveTissue(buffer, typeOfTissue) {
		fs.writeFile(
			storage.getTissueFolder(this._startDate, typeOfTissue),
      Buffer.concat([header(config.mic.rate), buffer]), err => {
			if(err) {
				return console.log(err);
			}
		});
	}

	getSum (wave)  {
		const means = [];
		for (let index = 0; index < wave.length; index = index + N) {
			const slice = wave.slice(index, index + N);
    
			const mean = _.sumBy(slice, Math.abs);
			means.push(mean);
		}
		return _.min(_.flatten(means));
	}  

	/**
 *  filter noiz from wave, by equall sum of 100 ponts with standart (SUM_OF_100)
 *  @param {Array} 
 **/
	findSegment(wave, minWavesCount, buffer) {
		const sums = [];
		for (let index = 0; index < wave.length; index = index + N) {
			const slice = wave.slice(index, index + N);
			const sum = _.sumBy(slice, Math.abs);
			sums.push(sum);
		}

		const average = _.mean(sums);
		this._everages.push(average);

		if (average < this._limitOfSilence * 0.7) {
			console.log({ average, length: this._waves.length })
			if (this._waves.length >= minWavesCount) {
				const segment = _.flatten(this._waves);
				this._saveSegment(this._buffers);
				this.emit('segment', segment, average, this._buffers);
			}

			this._waves = [];
			this._buffers = [];
			this.emit('noSegment');
		} else {

			this._waves.push(_.values(wave));
			this._buffers = this._buffers.length ? Buffer.concat([this._buffers, buffer]) : buffer;
		}
	}
}

module.exports = Segmentor;
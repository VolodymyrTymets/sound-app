const _ = require('lodash');
const { mic_data, find_segment } = require('../event-names');
const mic = require('../../utils/Mic');
const { Segmenter } = require('../../utils/segmenter');
const { fftThreadWorker } = require('../../utils/FFT');
const { rectangleGeneratorThreadWorker } = require('../../utils/RectangleGenertor');

const skipArrayElements = (array, step = 4) => {
	const res = [];
	for (let index = 0; index < array.length; index = index + step) {
		res.push(array[index]);
	}
	return res;
};

const startRecord = client => () => {
	let waves = [];
	const recordTine = new Date();
	const segmenter = new Segmenter(recordTine);
	rectangleGeneratorThreadWorker.start(1);
	mic.start(recordTine, (audioData, buffer) => {
		const wave = audioData.channelData[0];
		waves.push(wave);
		if (waves.length === 11) {
			// const waveToClient = _.flatten(waves.map(w => skipArrayElements(w)));
			// client.emit(mic_data, waveToClient);
			waves = [];
		}
		segmenter.findSegment(wave, 11, buffer); //min should be 11 waves = 1 second
	});

	segmenter.on('segment', (segment, average, buffer) => {
		const segmentToClient = skipArrayElements(segment);

		fftThreadWorker.start(segment, (response) => {
			const { spectrum, energy, similarity, tissueType } = response;
			if(tissueType) {
				segmenter.saveTissue(buffer, tissueType);
			}
			client.emit(find_segment, {
				average,
				energy,
				tissueType,
				spectrum,
				similarity,
				segment: segmentToClient,
			});
		});
	});
};

module.exports = startRecord;
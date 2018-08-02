const _ = require('lodash');
const { mic_data, find_segment, recording } = require('../event-names');
const { Mic } = require('../../utils/Mic');
const { Segmenter } = require('../../utils/segmenter');
const { fftThreadWorker } = require('../../utils/FFT');
const { notify } = require('../../utils/notifier');
const config = require('../../config');
const { rectangleGeneratorThreadWorker } = require('../../utils/RectangleGenertor');

const skipArrayElements = (array, step = 4) => {
	const res = [];
	for (let index = 0; index < array.length; index = index + step) {
		res.push(array[index]);
	}
	return res;
};

const startRecord = client => ({ settings }) => {
	const mic = new Mic(settings);
	if(global.mic) {
		mic.stop();
	}
  global.mic = mic;

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
			client.emit(recording, { success: true });
			waves = [];
		}
		segmenter.findSegment(wave, config.minSegmentLength, buffer);
	});

	segmenter.on('segment', (segment, average, buffer) => {
		const segmentToClient = skipArrayElements(segment);

		fftThreadWorker.start(segment, (response) => {
			const { spectrum, energy, similarity, tissueType } = response;
			if(tissueType) {
				segmenter.saveTissue(buffer, tissueType);
				notify();
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
const _ = require('lodash');
const { mic_data, find_segment, recording } = require('../event-names');
const { Mic } = require('../../utils/Mic');
const { Segmenter } = require('../../utils/segmenter');
const { getSpectrumInfo } = require('../../utils/fft/getSpectrumInfo');
const { notify } = require('../../utils/notifier');
const { rectangleGeneratorThreadWorker } = require('../../utils/RectangleGenertor');

const skipArrayElements = (array, step = 4) => {
	const res = [];
	for (let index = 0; index < array.length; index = index + step) {
		res.push(array[index]);
	}
	return res;
};

const startRecord = (client, config) => ({ settings }) => {
	console.log({ settings });
	const mic = new Mic(settings, config);
	if(global.mic) {
		mic.stop();
	}
  global.mic = mic;

	let waves = [];
	const recordTine = new Date();
	const segmenter = new Segmenter(recordTine, config, settings);

	rectangleGeneratorThreadWorker.start(450);
	mic.start(recordTine, (audioData) => {
		const wave = audioData.channelData[0];
		waves.push(wave);
		if (waves.length === 11) {
			const waveToClient = _.flatten(waves.map(w => skipArrayElements(w)));
			client.emit(mic_data, waveToClient);
			client.emit(recording, { success: true });
			waves = [];
		}
		segmenter.findSegment(wave);
	});

	segmenter.on('segment', (segment,  average) => {
		const segmentToClient = skipArrayElements(segment);
    const minEnergy = settings.minEnergy && parseFloat(settings.minEnergy);

    const { spectrum, energy, similarity, tissueType }  = getSpectrumInfo(segment, minEnergy);
    if(tissueType) {
      notify(config.assetsPath);
    }
    client.emit(find_segment, {
      average,
      energy,
      tissueType,
      spectrum,
      similarity,
      segment: segmentToClient,
    });
		// fftThreadWorker.start(segment, minEnergy, (response) => {
		// 	const { spectrum, energy, similarity, tissueType } = response;
		// 	if(tissueType) {
		// 		segmenter.saveTissue(buffer, tissueType);
		// 		notify(config.assetsPath);
		// 	}
		// 	client.emit(find_segment, {
		// 		average,
		// 		energy,
		// 		tissueType,
		// 		spectrum,
		// 		similarity,
		// 		segment:  [] //segmentToClient,
		// 	});
		// });
	});
};

module.exports = startRecord;
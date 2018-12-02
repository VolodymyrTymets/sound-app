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

const isForRaspi = process.env.TARGET === 'raspi';

const startRecordOld = (client, config) => ({ settings }) => {
	console.log({ settings });
	const mic = new Mic(settings, config);
	if(global.mic) {
		mic.stop();
	}
  global.mic = mic;

	let waves = [];
	const recordTine = new Date();
	const segmenter = new Segmenter(recordTine, config, settings);

	// todo:uncomment  rectangleGeneratorThreadWorker when will be tested
	if(!isForRaspi) {
    rectangleGeneratorThreadWorker.start(450);
  }
	mic.start(recordTine, (audioData, buffer) => {
		const wave = audioData.channelData[0];
		waves.push(wave);
		if (waves.length === 11) {
			if(isForRaspi) {
        const waveToClient = _.flatten(waves.map(w => skipArrayElements(w)));
        client.emit(mic_data, waveToClient);
      }
			client.emit(recording, { success: true });
			waves = [];
		}
		segmenter.findSegment(wave);
	});

	segmenter.on('segment', (segment,  average) => {
    const minEnergy = settings.minEnergy && parseFloat(settings.minEnergy);

    const { spectrum, energy, tissueType, test }  = getSpectrumInfo(segment, minEnergy);
    if(tissueType) {
			mic.saveTissueTime(tissueType);
      notify(config.assetsPath);
    }
    client.emit(find_segment, {
      average,
      energy,
      tissueType,
      spectrum,
      segment: isForRaspi ? [] : skipArrayElements(segment),
			test: test,
    });
	});
};

module.exports = startRecordOld;

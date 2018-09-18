const mic = require('../../utils/Mic');
const { rectangleGeneratorThreadWorker } = require('../../utils/RectangleGenertor');

const stopRecord = () => () => {
	// rectangleGeneratorThreadWorker.stop();
  global.mic && global.mic.stop();
};

module.exports = stopRecord;
const mic = require('../../utils/Mic');
const { rectangleGeneratorThreadWorker } = require('../../utils/RectangleGenertor');

const stopRecord = () => () => {
	console.log('---> stop-record');
	mic.stop();
	rectangleGeneratorThreadWorker.stop();
};

module.exports = stopRecord;
const mic = require('../../utils/Mic');

const stopRecord = () => () => {
	console.log('---> stop-record');
	mic.stop();
};

module.exports = stopRecord;
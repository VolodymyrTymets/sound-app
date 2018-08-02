const stopRecord = () => () => {
	console.log('---> stop-record');
  global.mic && global.mic.stop();
};

module.exports = stopRecord;
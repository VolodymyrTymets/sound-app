const mic = require('../../utils/Mic');

const stopRecord = client => data => {
  console.log('stop-record', data)
  mic.stop();
};

module.exports = stopRecord;
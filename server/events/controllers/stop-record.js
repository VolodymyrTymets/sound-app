const mic = require('../../utils/Mic');

const stopRecord = client => data => {
  console.log('---> stop-record')
  mic.stop();
};

module.exports = stopRecord;
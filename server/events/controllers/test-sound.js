const { notify } = require('../../utils/notifier');

const testSound = client => ({ settings }) => {
  notify();
};

module.exports = testSound;
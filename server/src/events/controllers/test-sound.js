const { notify } = require('../../utils/notifier');

const testSound = (client, config) => ({ settings }) => {
  notify(config.assetsPath);
};

module.exports = testSound;
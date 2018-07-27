const config = require('../../config');

const getTissueType = (spectrum, energy) => {
  let tissueType = '';
  if (energy > config.maxEnergy) {
    tissueType = 'nerve';
  }
  if (energy < config.minEnergy) {
    tissueType = 'muscle';
  }
  return tissueType;
};

module.exports = { getTissueType };
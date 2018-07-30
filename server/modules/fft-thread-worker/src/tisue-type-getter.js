const { config } = require('../config');

const getTissueType = (spectrum, energy) => {
  let tissueType = '';
  if (energy > config.meanEnergy * 0.8) {
    tissueType = 'nerve';
  }
  // if (energy < config.minEnergy) {
  //   tissueType = 'muscle';
  // }
  return tissueType;
};

module.exports = { getTissueType };
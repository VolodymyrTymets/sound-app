module.exports = {
  mic: {
    rate: 44100,
    channels: 2,
    debug: true,
    exitOnSilence: 6,
    device: `plughw:${process.env.MIC || 0}`,
    fileType: 'wav',
  },
  minEnergy: 0.36,
  maxEnergy: 0.38,
  minSpectrum: 0.6,
  maxSpectrum: 0.6,
};
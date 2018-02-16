module.exports = {
  mic: {
    rate: 44100,
    channels: 2,
    debug: true,
    exitOnSilence: 6,
    device: `plughw:${process.env.MIC || 0}`,
    fileType: 'wav',
  },
  LIMIT_OF_SILENCE: 1,
};
module.exports = {
  mic: {
    rate: 44100,
    channels: 2,
    debug: true,
    exitOnSilence: 6,
    device: process.env.NODE_ENV === 'production' ? 'plughw:1' : 'plughw:0',
    fileType: 'wav',
  },
  LIMIT_OF_SILENCE: 1,
};
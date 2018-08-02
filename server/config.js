module.exports = {
  mic: {
    rate: 44100,
    channels: 2,
    debug: true,
    exitOnSilence: 6,
    device: `plughw:${process.env.MIC || 1}`,
    fileType: 'wav',
  },
  storeFolderName: 'Sound-app',
  minSegmentLength: 5, // 500 ms
};
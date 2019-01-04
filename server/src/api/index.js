const express = require('express');
const { config: { meanSpectrum, meanEnergy } } = require('../utils/fft/config');
const { Storage } = require('../utils/storage');
const { getMP3 } = require('./controllers/get-mp3');

const routersInit = (config) => {
  const router = express();

	router.get('/mean-spectrum', (req, res) => {
		res.status(200).send({ meanSpectrum, meanEnergy });
	});
	router.get('/storage-path', (req, res) => {
		res.status(200).send({ path: new Storage(config).getPath() });
	});
  router.get('/config', (req, res) => {
    res.status(200).send({ config: { mic: config.mic.device} });
  });

  router.get('/mp3', getMP3);
	return router;
};

module.exports = routersInit;

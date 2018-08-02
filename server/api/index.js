const express = require('express');
const { config: { meanSpectrum, meanEnergy } } = require('fft-thread-worker');
const { storage } = require('../utils/storage');

const routersInit = (config) => {
  const router = express();

	router.get('/mean-spectrum', (req, res) => {
		res.status(200).send({ meanSpectrum, meanEnergy });
	});
	router.get('/storage-path', (req, res) => {
		res.status(200).send({ path: storage.getPath() });
	});
  router.get('/config', (req, res) => {
    res.status(200).send({ config: { mic: config.mic.device} });
  });
	return router;
};

module.exports = routersInit;

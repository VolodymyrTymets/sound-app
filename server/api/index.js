const express = require('express');
const { config: { meanSpectrum, meanEnergy } } = require('fft-thread-worker');
const { storage } = require('../utils/storage');

const routersInit = () => {
  const router = express();

	router.get('/mean-spectrum', (req, res) => {
		res.status(200).send({ meanSpectrum, meanEnergy });
	});
	router.get('/storage-path', (req, res) => {
		res.status(200).send({ path: storage.getPath() });
	});
	return router;
};

module.exports = routersInit;

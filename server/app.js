const express = require('express');
const path = require('path');
const { config: { meanSpectrum, meanEnergy } } = require('fft-thread-worker');

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.static(path.resolve(__dirname, './public/build/')));


app.get('/api/v1/mean-spectrum', (req, res) => {
	res.status(200).send({ meanSpectrum, meanEnergy });
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/build/', './index.html'));
});



module.exports = app;

const express = require('express');
const path = require('path');
const api = require('./api');
const config = require('./config')

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.static(path.resolve(__dirname, './public/build/')));


// api routes v1
app.use('/api/v1', api(config));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/build/', './index.html'));
});

module.exports = app;

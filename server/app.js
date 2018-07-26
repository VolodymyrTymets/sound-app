const express = require('express');
const path = require('path');
const config = require('./config');

global.config = config;

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.static(path.resolve(__dirname, '../', './client', './build/')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', './client', './build/', 'index.html'));
});

module.exports = app;

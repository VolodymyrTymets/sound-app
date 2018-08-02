const { startRecord, stopRecord } = require('./controllers');
const events = require('./event-names');
const { storage } = require('../utils/storage');

module.exports = server => {
	global.io = require('socket.io')(server);
	global.io.on('connection', client => {
		client.on(events.start_record, startRecord(client));
		client.on(events.stop_record, stopRecord(client));
		client.on('disconnect', () => {});
		storage.saveSocket(client, events.storage_path);
	});
};
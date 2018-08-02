const { startRecord, stopRecord, testSound } = require('./controllers');
const events = require('./event-names');

module.exports = server => {
	global.io = require('socket.io')(server);
	global.io.on('connection', client => {
		client.on(events.start_record, startRecord(client));
		client.on(events.stop_record, stopRecord(client));
    client.on(events.test_sound, testSound(client));
		client.on('disconnect', () => {});
	});
};
const { startRecord, stopRecord, testSound } = require('./controllers');
const events = require('./event-names');
var ss = require('socket.io-stream');

module.exports = (server, config) => {
	global.io = require('socket.io')(server);
  global.ss = ss;
	global.io.on('connection', client => {
		global.client = client;
		client.on(events.start_record, startRecord(client, config));
		client.on(events.stop_record, stopRecord(client, config));
    client.on(events.test_sound, testSound(client, config));
		client.on('disconnect', () => {});



	});
};

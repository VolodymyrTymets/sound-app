const { testAction } = require('./controllers');
const events = require('../../both/event-names');

module.exports = server => {
  global.io = require('socket.io')(server);
  global.io.on('connection', client => {
    client.on(events.TEST, testAction(client));
    client.on('disconnect', () => {});
  });
};
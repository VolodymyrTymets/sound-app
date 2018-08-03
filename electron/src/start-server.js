const spawn = require('threads').spawn;
const { config } = require('../config');

class ServerThreadWorker {
  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.log = this.log.bind(this);
  }

  log(message) {
    console.log(`-> [ServerThreadWorker]: ${message.message || message}`)
  }

  start(callback) {
    this._thread = spawn(function (input, done) {
      const { startServer } = require('server');
      const { port, config } = input;
      startServer(port, config, done);
    })
			.on('message', ({ message }) => {
				this.log(message);
				callback();
			})
      .send({ port: process.env.PORT, config })
      .on('error', this.log)
      .on('exit', () => this.log('stopped!'));
  }
  stop() {
    this._thread.kill();
  }
}

const serverThreadWorker = new ServerThreadWorker();
module.exports = { serverThreadWorker };
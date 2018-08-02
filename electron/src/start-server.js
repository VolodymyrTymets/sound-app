const spawn = require('threads').spawn;
const usb = require('usb-detection');

class ServerThreadWorker {
  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.log = this.log.bind(this);
  }

  log(message) {
    console.log(`-> [ServerThreadWorker]: ${message.message || message}`)
  }

  start() {
    this._thread = spawn(function (input, done) {
      const { startServer } = require('server');
      const { port } = input;
      startServer(port, done);
    })
      .send({ port: process.env.PORT })
      .on('error', this.log)
      .on('exit', () => this.log('stopped!'));
  }
  stop() {
    this._thread.kill();
  }
}

const serverThreadWorker = new ServerThreadWorker();
module.exports = { serverThreadWorker };
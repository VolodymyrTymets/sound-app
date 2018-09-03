const spawn = require('threads').spawn;

class RectangleGeneratorThreadWorker {
  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.log = this.log.bind(this);
  }

  log(message) {
    console.log(`-> [RectangleGeneratorThreadWorker]: ${message.message || message}`);
  }

  start(freq = 450, position = 1, outNumber1 = 14, outNumber2 = 15) {
    this._thread = spawn(function (input, done) {
      const { freq, position, outNumber1, outNumber2 } = input;
      const { generateRectangle } = require('rectangle-generator-thread-worker');
      generateRectangle(freq, position, outNumber1, outNumber2, done);
    })
      .on('message', () => {
        this._thread.kill();
      })
      .send({ freq, position, outNumber1, outNumber2 })
      .on('error', this.log)
      .on('exit', () => this.log('stopped!'));
  }
  stop() {
    this._thread.kill();
  }
}

const rectangleGeneratorThreadWorker = new RectangleGeneratorThreadWorker();
module.exports = { rectangleGeneratorThreadWorker };
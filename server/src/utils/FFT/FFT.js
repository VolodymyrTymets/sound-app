const spawn = require('threads').spawn;

class FFTThreadWorker {
	constructor() {
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.log = this.log.bind(this);
	}

	log(message) {
		console.log(`-> [FFTThreadWorker]: ${message.message || message}`);
	}

	start(wave, minEnergy, callback) {
		this._thread = spawn(function (input, done) {
			const { getSpectrumInfo } = require('fft-thread-worker');
			getSpectrumInfo(input.wave, input.minEnergy, done);
		})
			.on('message', (response) => {
				callback(response);
				this._thread.kill();
			})
			.send({ wave, minEnergy })
			.on('error', this.log)
			.on('exit', () => this.log('stopped!'));
	}
	stop() {
		this._thread.kill();
	}
}

const fftThreadWorker = new FFTThreadWorker();
module.exports = { fftThreadWorker };
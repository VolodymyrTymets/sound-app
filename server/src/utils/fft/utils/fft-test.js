const { max, indexOf, values } = require('lodash');
const fft = require('fourier-transform');
const { config } = require('../config');

function nearestPow2( aSize ){
	return Math.pow( 2, Math.round( Math.log( aSize ) / Math.log( 2 ) ) );
}

const spliceSpectrumTest = (spectrum) => {
	const maxSpectrum = max(spectrum);
	const maxIndex = indexOf(spectrum, maxSpectrum);
	const from = maxIndex - (config.N / 2) || 0;
	const to = maxIndex + (config.N / 2);

	const splicedSpectrum = spectrum.slice(from >= 0 ? from : 0, to);
	return { splicedSpectrum,  maxIndex };
};


const fftTest = (wave) => {
	let waveLength = wave.length;
	let index = nearestPow2(waveLength);

	while (!(index <= wave.length)) {
		waveLength = waveLength - 2;
		index = nearestPow2(waveLength);
	}

	const cutedWave = wave.slice(0, index);
	const spectrum = fft(cutedWave);
	return { wave: values(cutedWave), spectrum };
};

module.exports = { fftTest, spliceSpectrumTest };

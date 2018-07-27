const { sum } = require('lodash');

const getIndexOfMax = spectrum => {
  let max = spectrum[0].amplitude;
  let maxIndex = 0;

  for (var i = 1; i < spectrum.length; i++) {
    if (spectrum[i].amplitude > max) {
      maxIndex = i;
      max = spectrum[i].amplitude;
    }
  }
  return maxIndex;
};

const getSpectrumEnergy = (spectrum, l) => {
  const indexOfMax = getIndexOfMax(spectrum);
  console.log('indexOfMax ->', indexOfMax);
  console.log('spectrum ->', spectrum[indexOfMax].amplitude);
  // build arra to calculate energy +-l from max amplitude
  const toCalculation = [];
  let leftIndex = indexOfMax;
  do {
    toCalculation.push(spectrum[leftIndex]);
    leftIndex--;
  } while (spectrum[leftIndex] && (spectrum[leftIndex].frequency > spectrum[indexOfMax].frequency - l));
  toCalculation.reverse();

  let rightIndex = indexOfMax + 1;
  do {
    toCalculation.push(spectrum[rightIndex]);
    rightIndex++;
  } while (spectrum[rightIndex] && (spectrum[rightIndex].frequency < spectrum[indexOfMax].frequency + l))


  // calculate squere
  const squeres = [];
  for(let index = 0; index < toCalculation.length - 1; index ++) {
    const a = toCalculation[index].amplitude;
    const b = toCalculation[index + 1].frequency - toCalculation[index].frequency;
    squeres.push(a * b);
  }

  return sum(squeres);
};

module.exports = { getSpectrumEnergy };
const getVisualiser = (config ) => {

  // get svg elements
  const paths = document.getElementsByTagName('path');
  const visualizer = document.getElementById('visualizer');
  const mask = visualizer.getElementById('mask');
  let path;

  // fill svg
  visualizer.setAttribute('viewBox', `0 0 ${config.pointsToRender} 512`);
  for (var i = 0 ; i < config.pointsToRender; i++) {
    path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-dasharray', '4,1');
    mask.appendChild(path);
  }

  // call it when new chank from stream ready
  const visualizeWave = function (frequencyArray) {

    const step = parseInt(frequencyArray.length / config.pointsToRender);

    for (let i = 0 ; i < config.pointsToRender; i++) {
      const index = i * step;
      // find compression wave
      let avarage = 0;
      for (let j = index ; j < index + step; j++) {
        avarage += frequencyArray[j];
      }

      // draw wave
      avarage = avarage / step;
      const value = (avarage  * config.noiseLevelAdjustment) * config.noiseLevel;
      const adjustedLength = Math.floor(value) - (Math.floor(value) % 5);

      const x = i; // -> duration left
      const y = 521 / 2; // duration Up.
      const x1 = 0; // destination left.
      const y1 = adjustedLength * -1; // duration Up.

      const asN = n => n || 0;
      const pathString = `M ${asN(x)},${asN(y)} l ${asN(x1)} ${asN(y1)}`;
      paths[i].setAttribute('d', pathString);
    }
  };

  const clearWave = (paths) => {
    for (let i = 0 ; i < 255; i++) {
      paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + 0);
    }
  };

  return { visualizeWave, clearWave }
};



export { getVisualiser };

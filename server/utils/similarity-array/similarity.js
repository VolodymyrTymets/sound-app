const similarity = (source, target) => {
  let sum = 0;
  const map = source.map((sourceItem, i) => (target[i] * 100) / sourceItem);
  map.forEach(mapItem => { sum += mapItem; });
  return sum / map.length;
};


console.log('3, 2, 1], [2, 1, 0] ->', similarity([3, 2, 1], [2, 1, 0]));
console.log('3, 2, 1], [4, 1, 0] ->', similarity([3, 2, 1], [4, 1, 0]));
console.log('3, 2, 1], [3, 2, 1] ->', similarity([3, 2, 1], [3, 2, 1]));


module.exports = { similarity }
const getSimilarity = (source, target, getItem = x => x) => {
  let sum = 0;
  const map = source.map((sourceItem, i) =>
    (getItem(target[i]) * 100) / (getItem(sourceItem) || 1));
  map.forEach(mapItem => { sum += mapItem; });
  return sum / map.length + 1;
};

module.exports = { getSimilarity };
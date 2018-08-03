const oldgetSimilarity = (source, target, getItem = x => x) => {
	let sum = 0;
	const map = source.map((sourceItem, i) =>
		((getItem(target[i]) || 1) * 100) / (getItem(sourceItem) || 1));
	map.forEach(mapItem => { sum += mapItem; });
	return sum / map.length;
};

const getSimilarity = (source, target, getItem = x => x) => {
	let sum1 = 0;
	let sum2 = 0;
	source.forEach((v) =>{sum1 += getItem(v)});
	target.forEach((v) =>{sum2 += getItem(v)});
	const rang1 = ((sum2 || 1) * 100) / (sum1 || 1);
	const rang2 = ((sum1 || 1) * 100) / (sum2 || 1);
	return rang1 < rang2 ? rang1 : rang2;
};

module.exports = { getSimilarity };
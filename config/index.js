const mainConfig = require('./config');
const electronConfig = require('./config.prod');

let config = mainConfig;
console.log('process.env.NODE_ENV ->', process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production') {
	config = electronConfig;
}

console.log(config.assetsPath);

module.exports = { config };
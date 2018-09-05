const path = require('path');
const player = require('play-sound')(opts = {});

const notify = (assetsPath = '../../../private/assets') => {
	//console.log('assetsPath ->', assetsPath)
	const filePath = path.resolve(assetsPath, './signals', './notification.wav');
	//console.log('[notify] FilePath ->', filePath)

	player.play(filePath, (err) => {
		if (err) {
			console.log('-> [notifier error]');
			console.log(err);
		}
	});
};

module.exports = { notify };
const path = require('path');
const player = require('play-sound')(opts = {});
const notify = () => {
  const filePath = path.resolve(__dirname, '../../', './private/assets/signals', './notification.wav');
  player.play(filePath, function(err){
    if (err) console.log('-> [notifier error]', err.message);
  })
};

module.exports = { notify };
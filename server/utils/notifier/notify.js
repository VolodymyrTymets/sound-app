const path = require('path');
const player = require('play-sound')(opts = {});
const notify = () => {
  const filePath = path.resolve(__dirname, '../../', './private/assets/signals', './notification.wav');
  console.log('filePath ->', filePath)
  player.play(filePath, function(err){
    if (err) {
      console.log('-> [notifier error]');
      console.log(err);
    };
  })
};

module.exports = { notify };
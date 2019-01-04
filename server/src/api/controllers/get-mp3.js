const fileSystem = require('fs');
const  path = require('path');
// const util = require('util');

const getMP3 = (req, res, err) => {
  var filePath = path.resolve(__dirname, './nervs.wav');
  var stat = fileSystem.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  });
  const readStream = fileSystem.createReadStream(filePath);
  readStream.on('data', (data) => {
    console.log('data ->', data.length)
  });
  readStream.on('end', () => {
    console.log('_______end___')
  });
  const { ss } = global;
  const stream = ss.createStream();
  ss(global.client).emit('mp3-stream', stream, { size: stat.size });
  readStream.pipe(stream);
  //readStream.pipe(res);
};

module.exports = { getMP3 };


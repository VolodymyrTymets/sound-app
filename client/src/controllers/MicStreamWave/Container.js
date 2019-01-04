import { compose, lifecycle} from 'recompose';
import ss from 'socket.io-stream';
import axios from 'axios';


import socket from '../../utils/socket';
import Component from './Component';
import { withWaveHeader } from './src/wave-heared';
import { getVisualiser } from './src/visualizer';

AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContent = new AudioContext();

const configWave = {
  pointsToRender: 256,
  noiseLevelAdjustment: 1000,
  noiseLevel: 3,
};

function concatenateAudioBuffers(buffer1, buffer2) {
  if (!buffer1 || !buffer2) {
    console.log("no buffers!");
    return null;
  }

  if (buffer1.numberOfChannels != buffer2.numberOfChannels) {
    console.log("number of channels is not the same!");
    return null;
  }

  if (buffer1.sampleRate != buffer2.sampleRate) {
    console.log("sample rates don't match!");
    return null;
  }

  var tmp = audioContent.createBuffer(buffer1.numberOfChannels, buffer1.length + buffer2.length, buffer1.sampleRate);

  for (var i=0; i<tmp.numberOfChannels; i++) {
    var data = tmp.getChannelData(i);
    data.set(buffer1.getChannelData(i));
    data.set(buffer2.getChannelData(i),buffer1.length);
  }
  return tmp;
};

const enhance = compose(
  lifecycle({
    componentDidMount() {
      const { visualizeWave, clearWave } = getVisualiser(configWave);
      ss(socket).on('mic-stream', (s) => {
        s.on('data', buffer =>
          audioContent.decodeAudioData(
            withWaveHeader(buffer, 2, 44100),
            (decoded) => visualizeWave(decoded.getChannelData(0)), console.log))
      });

      ss(socket).on('mp3-stream', (s, data) => {
        console.log('data ->', data)
        let rate = 0
        let letensy = 0

        s.on('data', buffer => {
          rate =  rate + (100 / data.size) * buffer.length;
          console.log('mp3-stream.data ->', rate)
          audioContent.decodeAudioData(withWaveHeader(buffer, 2, 44100))
            .then(audioBuffer => {
              const source = audioContent.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContent.destination);
              source.start(letensy);
              letensy = letensy + source.buffer.duration;
          }).catch(console.log)
        });
        s.on('end', () => console.log('end'))
      });


      axios.get('/api/v1/mp3', {
        //url: '/api/v1/mp3',
        responseType: 'blob',
        // `onDownloadProgress` allows handling of progress events for downloads
        // onDownloadProgress: function (progressEvent) {
        //   console.log('progressEvent ->', progressEvent)
        // },
        // transformResponse: function (data) {
        //   console.log('transformResponse ->')
        //   return data;
        // }
      })
        .then(function (response) {
          console.log(response.data)
          response.data.on('end', () => {
           console.log('end')
         })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }),
);

export default enhance(Component);

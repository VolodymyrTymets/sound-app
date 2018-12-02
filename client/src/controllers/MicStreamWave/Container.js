import { compose, lifecycle} from 'recompose';
import ss from 'socket.io-stream';


import socket from '../../utils/socket';
import Component from './Component';
import { withWaveHeader } from './src/wave-heared';
import { getVisualiser } from './src/visualizer';

AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContent = new AudioContext();

const configWave = {
  pointsToRender: 256,
  noiseLevelAdjustment: 1000,
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
    },
  }),
);

export default enhance(Component);

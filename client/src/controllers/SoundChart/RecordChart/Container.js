import {compose, lifecycle} from 'recompose';
import list from '../../../utils/event-names';

import socket from '../../../utils/socket';
import CanvasJS from '../../../utils/canvasjs.min';

import Component from './Component';


const dps = [];
const seconds = 5;

const enhance = compose(
  lifecycle({
    componentDidMount() {
      const chart = new CanvasJS.Chart("record-chat", {
        title: {
          // text: 'Recorded',
        },
        axisY: {
          includeZero: false,
          minimum: -1.5,
          maximum: 1.5,
        },
        data: [{
          type: "line",
          dataPoints: dps
        }]
      });

      socket.on(list.mic_data, wave => {
        if(!dps.length) {
          for(let index = 0; index < wave.length * (seconds -1); index++) {
            dps.push({ y: 0, x: index})
          }
        }
        if (dps.length >= wave.length * seconds) {
          dps.splice(0, wave.length);
          dps.forEach((value, index) => {
            dps[index] = { y: dps[index].y, x: dps[index].x - wave.length}
          });
        }
        const last = (dps.length - 1);
        wave.forEach((value, index) => {
          dps.push({y: value, x: last + index})
        });
        chart.render();
      });
      chart.render();
    },
  })
);

export default enhance(Component);

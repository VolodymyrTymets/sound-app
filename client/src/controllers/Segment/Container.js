import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';
import Component from './Component';
import { addSegment, setTissueType } from './redux/actions';
import socket from '../../utils/socket';
import list from '../../utils/event-names';

import { config } from '../../config';

import CanvasJS from '../../utils/canvasjs.min';

const segmentToPoints = segment => segment.map((value, index) => ({ y: value || 0, x: index }));
const spectrumToPoints = spectrum => spectrum.map(({ amplitude, frequency }, i) => ({ y: amplitude || 0, x: i }));

const enhance = compose(
  connect(state => ({
    segment: state.segment,
  }), { addSegment, setTissueType }),
  withProps({
    meanEnergy: config.meanEnergy,
    getSegmentChart: () => new CanvasJS.Chart('segment-chat', {
      title: {
        text: 'Segment',
      },
      axisY: {
        includeZero: false,
        minimum: -1,
        maximum: 1,
      },
      data: [{
        type: 'line',
        dataPoints: [],
      }],
    }),
    getSpectrumChart: () => new CanvasJS.Chart('spectrum-chat', {
      title: {
        text: 'Spectrum',
      },
      axisY: {
        includeZero: false,
      },
      data: [{
        type: 'line',
        dataPoints: [],
      }, {
        type: 'line',
        dataPoints: spectrumToPoints(config.meanSpectrum),
      }],
    }),
  }),
  lifecycle({
    componentDidMount() {
      const segmentChart = this.props.getSegmentChart();
      const spectrumChart = this.props.getSpectrumChart();
      segmentChart.render();
      spectrumChart.render();

      socket.on(list.find_segment, ({ segment, spectrum, average, energy, tissueType, similarity }) => {
        segmentChart.options.data[0].dataPoints = segmentToPoints(segment);
        spectrumChart.options.data[0].dataPoints = spectrumToPoints(spectrum);
        segmentChart.render();
        spectrumChart.render();
        console.log('similarity ->', similarity)

        this.props.addSegment(average, energy);
        this.props.setTissueType(tissueType);
        setTimeout(() => this.props.setTissueType(''), 500);
      });
    }
  }),
);

export default enhance(Component);

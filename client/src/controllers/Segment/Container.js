import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';
import Component from './Component';
import { addSegment, setTissueType } from './redux/actions';
import socket from '../../utils/socket';
import list from '../../utils/event-names';

import CanvasJS from '../../utils/canvasjs.min';

const enhance = compose(
  connect(state => ({
    segment: state.segment,
  }), { addSegment, setTissueType }),
  withProps({
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
      }],
    }),
  }),
  lifecycle({
    componentDidMount() {
      const segmentChart = this.props.getSegmentChart();
      const spectrumChart = this.props.getSpectrumChart();
      segmentChart.render();
      spectrumChart.render();

      const segmentToPoints = segment => segment.map((value, index) => ({ y: value || 0, x: index }));
      const spectrumToPoints = spectrum => spectrum.map(({ amplitude, frequency }) => ({ y: amplitude || 0, x: frequency }));
      socket.on(list.find_segment, ({ segment, spectrum, average, energy, tissueType }) => {
        segmentChart.options.data[0].dataPoints = segmentToPoints(segment);
        spectrumChart.options.data[0].dataPoints = spectrumToPoints(spectrum);
        segmentChart.render();
        spectrumChart.render();

        this.props.addSegment(average, energy);
        this.props.setTissueType(tissueType);
        setTimeout(() => this.props.setTissueType(''), 500);
      });
    }
  }),
);

export default enhance(Component);

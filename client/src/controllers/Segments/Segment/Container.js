
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Component from './Component';

const enhance = compose(
  connect(state => {
  }),
  lifecycle({
    componentDidMount() {
      const { segment, index } = this.props;
      const segmentChart = new window.CanvasJS.Chart(`segment-chat-${index}`, {
        title: {
          text: `Segment - ${index + 1}`
        },
        axisY: {
          includeZero: false,
          minimum: -1,
          maximum: 1
        },
        data: [{
          type: "line",
          dataPoints: segment.segment.map((value, index) => ({ y: value || 0, x: index }))
        }]
      });
      segmentChart.render();
      const spectrumChart = new window.CanvasJS.Chart(`spectrum-chat-${index}`, {
        title: {
          text: `Spectrum - ${index + 1}`
        },
        axisY: {
          includeZero: false,
        },
        data: [{
          type: "line",
          dataPoints: segment.spectrum.map(({ amplitude, frequency }) => ({ y: amplitude || 0, x: frequency }))
        }]
      });
      spectrumChart.render();
    },
  })
);

export default enhance(Component);

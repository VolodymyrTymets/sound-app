import { compose, lifecycle } from 'recompose';
import Component from './Component';
import CanvasJS from '../../../utils/canvasjs.min';

const sgmentToPoints =  segment => segment.map((value, index) => ({ y: value || 0, x: index }));
const spectrumToPoints = spectrum => spectrum.map(({ amplitude, frequency }) => ({ y: amplitude || 0, x: frequency }));

const enhance = compose(
  lifecycle({
    componentDidMount() {
     const { segment, index } = this.props;

     const segmentPoints = sgmentToPoints(segment.segment);
     const spectrumPoints = spectrumToPoints(segment.spectrum);

     const segmentChart = new CanvasJS.Chart(`segment-chat-${index}`, {
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
          dataPoints: segmentPoints
        }]
      });
      segmentChart.render();
      const spectrumChart = new CanvasJS.Chart(`spectrum-chat-${index}`, {
        title: {
          text: `Spectrum - ${index + 1}`
        },
        axisY: {
          includeZero: false,
        },
        data: [{
          type: "line",
          dataPoints: spectrumPoints
        }]
      });
      spectrumChart.render();
    },
    componentWillReceiveProps(newProps) {
      const { segment, index } = newProps;
      const segmentPoints = sgmentToPoints(segment.segment);
      const spectrumPoints = spectrumToPoints(segment.spectrum);

      const segmentChart = new CanvasJS.Chart(`segment-chat-${index}`, {
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
          dataPoints: segmentPoints
        }]
      });
      segmentChart.render();
      const spectrumChart = new CanvasJS.Chart(`spectrum-chat-${index}`, {
        title: {
          text: `Spectrum - ${index + 1}`
        },
        axisY: {
          includeZero: false,
        },
        data: [{
          type: "line",
          dataPoints: spectrumPoints
        }]
      });
      spectrumChart.render();
    }
  })
);

export default enhance(Component);

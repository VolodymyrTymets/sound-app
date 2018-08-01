import { connect } from 'react-redux';
import { compose, lifecycle, withProps, withState } from 'recompose';
import axios from 'axios';

import { addSegment, setTissueType } from './redux/actions';
import socket from '../../utils/socket';
import list from '../../utils/event-names';

import Component from './Component';
import CanvasJS from '../../utils/canvasjs.min';

// const segmentToPoints = segment => segment.map((value, index) => ({ y: value || 0, x: index }));
const spectrumToPoints = spectrum => spectrum.map(({ amplitude }, i) => ({ y: amplitude || 0, x: i }));

const enhance = compose(
	connect(state => ({
		segment: state.segment,
	}), { addSegment, setTissueType }),
	withState('meanEnergy', 'setMeanEnergy', 0),
	withProps({
		// getSegmentChart: () => new CanvasJS.Chart('segment-chat', {
		// 	title: {
		// 		text: 'Segment',
		// 	},
		// 	axisY: {
		// 		includeZero: false,
		// 		minimum: -2,
		// 		maximum: 2,
		// 	},
		// 	data: [{
		// 		type: 'line',
		// 		markerType: 'none',
		// 		dataPoints: [],
		// 	}],
		// }),
		getSpectrumChart: () => new CanvasJS.Chart('spectrum-chat', {
			title: {
				text: '',
			},
			axisY: {
				includeZero: false,
			},
			data: [{
				type: 'line',
				dataPoints: [],
			}, {
				type: 'line',
				dataPoints: [],
			}],
		}),
	}),
	lifecycle({
		componentDidMount() {
			// const segmentChart = this.props.getSegmentChart();
			const spectrumChart = this.props.getSpectrumChart();
			// segmentChart.render();
			spectrumChart.render();

			socket.on(list.find_segment, ({ segment, spectrum, average, energy, tissueType, similarity }) => {
				// segmentChart.options.data[0].dataPoints = segmentToPoints(segment);
				spectrumChart.options.data[0].dataPoints = spectrumToPoints(spectrum);
				// segmentChart.render();
				spectrumChart.render();
				console.log('similarity ->', similarity);

				this.props.addSegment(average, energy);
				this.props.setTissueType(tissueType);
				setTimeout(() => this.props.setTissueType(''), 500);
			});

			axios.get('/api/v1/mean-spectrum')
				.then(({ data }) => {
					const { meanEnergy, meanSpectrum } = data;
					this.props.setMeanEnergy(meanEnergy);
					spectrumChart.options.data[1].dataPoints = spectrumToPoints(meanSpectrum);
					spectrumChart.render();
				});
		},
	}),
);

export default enhance(Component);

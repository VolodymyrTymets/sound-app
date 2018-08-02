import { connect } from 'react-redux';
import { compose, lifecycle, withProps, withState } from 'recompose';
import moment from 'moment';

import socket from '../../utils/socket';
import list from '../../utils/event-names';

import Component from './Component';

const enhance = compose(
	connect(state => ({
		startRecordTime: state.micStatus.startRecordTime,
	})),
	withState('recordTime', 'setRecordTime', null),
	withProps({
		getDif:(startRecordTime, recordTime, methodName) => {
			if(startRecordTime && recordTime) {
				const duration = moment.duration(moment(recordTime).diff(startRecordTime));
				return duration[methodName]();
			} else {
				return 0;
			}
		}
	}),
	lifecycle({
		componentDidMount() {
			const { setRecordTime } = this.props;
			socket.on(list.recording, () => {
					setRecordTime(new Date().getTime());
			});
		},
	}),
);

export default enhance(Component);

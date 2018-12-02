import {
	START_RECORD,
	STOP_RECORD,
} from './constants';
import socket from '../../../utils/socket';
import list from '../../../utils/event-names';

const startRecord = (settings) => dispatch => {
	socket.emit(list.start_record, { settings });
	dispatch({
		type: START_RECORD,
	});
};
const stopRecord = () => dispatch => {
	socket.emit(list.stop_record);
	dispatch({
		type: STOP_RECORD,
	});
};

export {
	startRecord,
	stopRecord
};

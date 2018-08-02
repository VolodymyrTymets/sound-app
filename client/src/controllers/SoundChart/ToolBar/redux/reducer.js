import {
	START_RECORD,
	STOP_RECORD,
	STOP,
	RECORD,
} from './constants';

const DEFAULT = { status: STOP };

const micStatus = (state = DEFAULT, action) => {
	switch (action.type) {
	case STOP_RECORD:
		return {
			...state,
			status: STOP,
			startRecordTime: null,
		};
	case START_RECORD:
		return {
			...state,
			status: RECORD,
			startRecordTime: new Date().getTime(),
		};
	default:
		return state;
	}
};

export default micStatus;

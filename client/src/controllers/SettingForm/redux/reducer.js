import {
	CHANGE_SETTING_VALUE
} from './constants';


const DEFAULT = {
	fileName: 'record',
	mic: 'plughw:0',
	meanSegmentLength: 5,
	minSegmentTimeToListen: 2000,
	minEnergy: 0.4,
	maxEnergy: 0.6,
};

const settings = (state = DEFAULT, action) => {
	switch (action.type) {
	case CHANGE_SETTING_VALUE: {
		return {
			...state,
			[action.name]: action.value,
		};
	}
	default:
		return state;
	}
};

export default settings;

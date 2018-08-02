import {
	CHANGE_SETTING_VALUE
} from './constants';


const DEFAULT = {
	fileName: 'record',
	mic: 'plughw:0',
	segmentationValue: 5,
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

import {
	ADD_SEGMENT,
	SET_TISSUE_TYPE,
} from './constants';

const DEFAULT = { average: 0, energy: 0 };

const segment = (state = DEFAULT, action) => {
	switch (action.type) {
	case ADD_SEGMENT: {
		return {
			average: action.average,
			energy: action.energy,
		};
	}
	default:
		return state;
	}
};
const tissueType = (state = '', action) => {
	switch (action.type) {
	case SET_TISSUE_TYPE: {
		return action.tissueType;
	}
	default:
		return state;
	}
};

export { segment, tissueType };

import {
	ADD_SEGMENT,
	SET_TISSUE_TYPE
} from './constants';


const addSegment = (average, energy) => dispatch => {
	dispatch({
		average,
		energy,
		type: ADD_SEGMENT,
	});
};

const setTissueType = (tissueType) => dispatch => {
	dispatch({
		tissueType,
		type: SET_TISSUE_TYPE,
	});
};
export {
	addSegment,
	setTissueType,
};

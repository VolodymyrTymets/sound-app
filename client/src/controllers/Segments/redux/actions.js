import {
  ADD_SEGMENT,
  SET_TISSUE_TYPE
} from './constants';


const addSegment = (segment, spectrum, average, energy) => dispatch => {
  dispatch({
    segment,
    spectrum,
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

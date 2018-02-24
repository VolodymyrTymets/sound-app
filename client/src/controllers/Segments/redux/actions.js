import {
  ADD_SEGMENT
} from './constants';


const addSegment = (segment, spectrum, average) => dispatch => {
  dispatch({
    segment,
    spectrum,
    average,
    type: ADD_SEGMENT,
  })
};
export {
  addSegment,
};

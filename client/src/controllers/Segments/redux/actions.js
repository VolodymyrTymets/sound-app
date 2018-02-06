import {
  ADD_SEGMENT
} from './constants';


const addSegment = (segment, spectrum) => dispatch => {
  dispatch({
    segment,
    spectrum,
    type: ADD_SEGMENT,
  })
};
export {
  addSegment,
};

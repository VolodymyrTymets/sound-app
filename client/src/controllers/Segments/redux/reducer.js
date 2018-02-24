import {
  ADD_SEGMENT
} from './constants';

const MAX_PER_PAGE = 1;
const DEFAULT = [];

const segments = (state = DEFAULT, action) => {
  switch (action.type) {
    case ADD_SEGMENT: {
     const newSegments = [...state, {segment: action.segment, spectrum: action.spectrum, average: action.average}];
     if (newSegments.length > MAX_PER_PAGE) {
       newSegments.splice(0, 1);
     }
     return newSegments;
    }
    default:
      return state;
  }
};

export { segments };

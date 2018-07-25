import {
  ADD_SEGMENT,
  SET_TISSUE_TYPE,
} from './constants';

const MAX_PER_PAGE = 1;
const DEFAULT = [];

const segments = (state = DEFAULT, action) => {
  switch (action.type) {
    case ADD_SEGMENT: {
      const newSegments = [...state, {
        segment: action.segment,
        spectrum: action.spectrum,
        average: action.average,
        energy: action.energy,
      }];
      if (newSegments.length > MAX_PER_PAGE) {
        newSegments.splice(0, 1);
      }
      return newSegments;
    }
    default:
      return state;
  }
};
const tissueType = (state = DEFAULT, action) => {
  switch (action.type) {
    case SET_TISSUE_TYPE: {
      return action.tissueType;
    }
    default:
      return state;
  }
};

export { segments, tissueType };

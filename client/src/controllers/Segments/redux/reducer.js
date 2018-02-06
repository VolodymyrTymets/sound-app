import {
  ADD_SEGMENT
} from './constants';


const DEFAULT = [];

const segments = (state = DEFAULT, action) => {
  switch (action.type) {
    case ADD_SEGMENT: {
     const res = [...state, {segment: action.segment, spectrum: action.spectrum}];
     console.log('res ->', res)
     return res;
    }
    default:
      return state;
  }
};

export { segments };

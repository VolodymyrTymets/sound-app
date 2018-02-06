import { combineReducers } from 'redux';
import micStatus from './controllers/SoundChart/ToolBar/redux/reducer'

const rootReducer = combineReducers({
  micStatus,
});

export default rootReducer;

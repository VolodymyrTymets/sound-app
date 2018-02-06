import { combineReducers } from 'redux';
import micStatus from './controllers/SoundChart/ToolBar/redux/reducer'
import { segments } from './controllers/Segments/redux/reducer'
const rootReducer = combineReducers({
  micStatus,
  segments,
});

export default rootReducer;

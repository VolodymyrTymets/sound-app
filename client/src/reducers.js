import { combineReducers } from 'redux';
import micStatus from './controllers/SoundChart/ToolBar/redux/reducer';
import { segments, tissueType } from './controllers/Segments/redux/reducer';
import { settings } from './controllers/SettingForm/redux/reducer';

const rootReducer = combineReducers({
  micStatus,
  segments,
  settings,
  tissueType,
});

export default rootReducer;

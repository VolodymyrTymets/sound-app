import { combineReducers } from 'redux';
import micStatus from './controllers/SoundChart/ToolBar/redux/reducer'
import { segments } from './controllers/Segments/redux/reducer'
import { settings } from './controllers/SettingForm/redux/reducer'
const rootReducer = combineReducers({
  micStatus,
  segments,
  settings,
});

export default rootReducer;

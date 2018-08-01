import { combineReducers } from 'redux';
import micStatus from './controllers/SoundChart/ToolBar/redux/reducer';
import { segment, tissueType } from './controllers/Segment/redux/reducer';
import settings from './controllers/SettingForm/redux/reducer';

const rootReducer = combineReducers({
	micStatus,
	segment,
	settings,
	tissueType,
});

export default rootReducer;

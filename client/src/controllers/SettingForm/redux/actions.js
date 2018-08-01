import {
	CHANGE_SETTING_VALUE
} from './constants';


const changeSettingsValue = (name, value) => dispatch => {
	dispatch({
		name,
		value,
		type: CHANGE_SETTING_VALUE,
	});
};
export { changeSettingsValue };

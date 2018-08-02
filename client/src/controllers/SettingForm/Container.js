import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import Component from './Component';
import { changeSettingsValue } from './redux/actions';

import socket from '../../utils/socket';
import list from '../../utils/event-names';

const enhance = compose(
	connect(state => ({
		settings: state.settings,
	}), { changeSettingsValue }),
	withHandlers({
		onChange: props => name => (e, value) =>
			props.changeSettingsValue(name, name === 'mic' ? `plughw:${value}` : value),
    onTestSoundClick: props  => (e, value) => socket.emit(list.test_sound, props.settings)
	}),
);

export default enhance(Component);

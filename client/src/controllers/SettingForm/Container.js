import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle } from 'recompose';
import Component from './Component';
import { changeSettingsValue } from './redux/actions';
import { notify } from '../../utils/notifier';

import socket from '../../utils/socket';
import list from '../../utils/event-names';
import axios from "axios/index";

const enhance = compose(
	connect(state => ({
		settings: state.settings,
	}), { changeSettingsValue }),
	withHandlers({
		onChange: props => name => (e, value) =>
			props.changeSettingsValue(name, name === 'mic' ? `plughw:${value}` : value),
    onTestSoundClick: props  => (e, value) => {
			socket.emit(list.test_sound, props.settings);
			notify();
		}
	}),
	lifecycle({
		componentDidMount() {
      axios.get('/api/v1/mean-spectrum')
        .then(({ data }) => {
          const { meanEnergy } = data;
          this.props.changeSettingsValue('minEnergy', meanEnergy);
        });
		}
	})
);

export default enhance(Component);

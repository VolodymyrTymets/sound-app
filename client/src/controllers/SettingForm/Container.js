import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import Component from './Component';
import { changeSettingsValue } from './redux/actions';


const enhance = compose(
	connect(state => ({
		settings: state.settings,
	}), { changeSettingsValue }),
	withHandlers({
		onChange: props => name => (e, value) =>
			props.changeSettingsValue(name, value),
	}),
);

export default enhance(Component);

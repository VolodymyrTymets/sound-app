import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
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
  lifecycle({
    componentWillMount() {
      console.log('settings form loaded')
    },
  })
);

export default enhance(Component);

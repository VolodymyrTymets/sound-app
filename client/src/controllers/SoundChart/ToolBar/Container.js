import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { stopRecord, startRecord } from './redux/actions';
import { STOP, RECORD } from './redux/constants';

import Component from './Component';

const actions = {
  [STOP]: 'startRecord',
  [RECORD]: 'stopRecord',
};

const enhance = compose(
  connect(state => ({
    status: state.micStatus.status,
    settings: state.settings,
  }), { stopRecord, startRecord }),
  withHandlers({
    onClick: props => () => props[actions[props.status]](props.settings),
  }),
);

export default enhance(Component);

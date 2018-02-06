import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
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
  }), { stopRecord, startRecord }),
  withHandlers({
    onClick: props => () => props[actions[props.status]](),
  }),
  lifecycle({
    componentWillMount() {
      console.log(this.props.stataus)
      // console.log('load')
      // socket.on('test', data => {
      //   console.log('---> on test', data)
      // });
      // setInterval(() => {
      //   socket.emit('TEST', 'hello word');
      // }, 1000)

    },
  })
);

export default enhance(Component);

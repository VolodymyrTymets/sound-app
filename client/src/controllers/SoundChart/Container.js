import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
import socket from '../../utils/socket';
import Component from './Component';


const enhance = compose(
  connect(state => {
  }),
  lifecycle({
    componentWillMount() {
      console.log('load')
      socket.on('test', data => {
        console.log('---> on test', data)
      });
      setInterval(() => {
        socket.emit('TEST', 'hello word');
      }, 1000)

    },
  })
);

export default enhance(Component);

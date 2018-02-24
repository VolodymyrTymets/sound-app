import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Component from './Component';
import socket from '../../utils/socket';
import list from '../../utils/event-names';
import { addSegment } from './redux/actions';


const enhance = compose(
  connect(state => ({
    segments: state.segments,
  }), { addSegment }),
  lifecycle({
    componentWillMount() {
      socket.on(list.find_segment, ({ segment, spectrum, average }) => {
        this.props.addSegment(segment, spectrum, average)
      })
    },
  })
);

export default enhance(Component);

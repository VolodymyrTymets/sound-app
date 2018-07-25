import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Component from './Component';
import socket from '../../utils/socket';
import list from '../../utils/event-names';
import { addSegment, setTissueType } from './redux/actions';


const enhance = compose(
  connect(state => ({
    segments: state.segments,
    tissueType: state.tissueType,
  }), { addSegment, setTissueType }),
  lifecycle({
    componentWillMount() {
      socket.on(list.find_segment, ({ segment, spectrum, average, energy, tissueType }) => {
        this.props.addSegment(segment, spectrum, average, energy);
        this.props.setTissueType(tissueType);
        setTimeout(() => this.props.setTissueType(''), 500);
      });
    },
  }),
);

export default enhance(Component);

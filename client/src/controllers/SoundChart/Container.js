import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Component from './Component';

const enhance = compose(
  connect(state => {
  }),
  lifecycle({
    componentWillMount() {
    },
  })
);

export default enhance(Component);

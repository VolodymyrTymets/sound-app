import { compose, lifecycle, withState } from 'recompose';
import axios from 'axios';

import Component from './Component';

const enhance = compose(
	withState('path', 'setPath', ''),
  withState('mic', 'setMic', ''),
	lifecycle({
		componentDidMount() {
			const { setPath, setMic } = this.props;

			axios.get('/api/v1/storage-path')
				.then(({ data }) => setPath(data.path));
      axios.get('/api/v1/config')
        .then(({ data }) => setMic(data.config.mic));
		},
	}),
);

export default enhance(Component);

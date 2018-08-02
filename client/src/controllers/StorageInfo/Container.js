import { compose, lifecycle, withState } from 'recompose';
import axios from 'axios';

import socket from '../../utils/socket';
import list from '../../utils/event-names';

import Component from './Component';


const enhance = compose(
	withState('path', 'setPath', ''),
	lifecycle({
		componentDidMount() {
			const { setPath } = this.props;
			socket.on(list.storage_path, ({ path }) => setPath(path));

			axios.get('/api/v1/storage-path')
				.then(({ data }) => setPath(data.path));
		},
	}),
);

export default enhance(Component);

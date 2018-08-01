import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import Component from './Component';

const enhance = compose(
	connect(state => ({
		tissueType: state.tissueType,
	})),
	withProps(({
		getClassByTissueType: (tissueType) => {
			if (tissueType == 'nerve') {
				return 'blue';
			}
			if (tissueType == 'muscle') {
				return 'green';
			}
			return 'white';
		},
	})),
);

export default enhance(Component);
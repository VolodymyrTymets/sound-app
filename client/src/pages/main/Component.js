import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

import { SoundChart, Segment } from '../../controllers';

const MainPage = ({ getClassByTissueType, tissueType }) => (
	<div className="container-fluid" style={{ backgroundColor: getClassByTissueType(tissueType) }}>
		<div>
			<h4 className="text-center">Tissue: {tissueType}</h4>
			<SoundChart />
			<Segment />
		</div>
	</div>);

MainPage.propTypes = {
	getClassByTissueType: PropTypes.func.isRequired,
	tissueType: PropTypes.string.isRequired,
};

export default MainPage;

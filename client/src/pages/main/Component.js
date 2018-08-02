import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

import { SoundChart, Segment, Timer, StorageInfo, SettingForm } from '../../controllers';

const MainPage = ({ getClassByTissueType, tissueType }) => (
	<div className="container-fluid" style={{ backgroundColor: getClassByTissueType(tissueType) }}>
		<div>
			<div className="row">
				<div className="col-md-6 col-lg-6">
					<Timer />
				</div>
				<div className="col-md-6 col-lg-6">
					<h4>Tissue: {tissueType}</h4>
				</div>
			</div>
      <SettingForm />
			<SoundChart />
			<Segment />
      <StorageInfo />
		</div>
	</div>);

MainPage.propTypes = {
	getClassByTissueType: PropTypes.func.isRequired,
	tissueType: PropTypes.string.isRequired,
};

export default MainPage;

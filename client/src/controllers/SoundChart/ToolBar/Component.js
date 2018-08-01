import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { STOP, RECORD } from './redux/constants';

const labels = {
	[STOP]: 'Record',
	[RECORD]: 'Stop',
};

const icons = {
	[STOP]: 'fiber_manual_record',
	[RECORD]: 'stop',
};

const ToolBar = ({ onClick, status }) => (
	<div className="row">
		<div className="col-md-12">
			<RaisedButton
				fullWidth
				label={labels[status]}
				className="align-content m-t-15"
				onClick={onClick}
				icon={<FontIcon className="material-icons">{icons[status]}</FontIcon>}
			/>
		</div>
	</div>);

ToolBar.propTypes = {
	onClick: PropTypes.func.isRequired,
	status: PropTypes.string.isRequired,
};

export default ToolBar;

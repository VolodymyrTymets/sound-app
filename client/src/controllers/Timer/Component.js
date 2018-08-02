import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ startRecordTime, recordTime, getDif }) => (
	<div>
		<span>TIME:</span><span>{getDif(startRecordTime, recordTime, 'minutes')}:{getDif(startRecordTime, recordTime, 'seconds')}</span>
	</div>
);

Timer.propTypes = {
	startRecordTime: PropTypes.number,
	recordTime: PropTypes.number,
};

export default Timer;

import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Segment = ({ segment, meanEnergy }) => (
	<div className="div">
		<div className="row m-t-15 segment">
			{/*<div className="col-md-6 col-lg-6">*/}
			{/*<div id="segment-chat" className="chat-container" />*/}
			{/*<span>average: {segment.average}</span>*/}
			{/*</div>*/}
			<div className="col-md-12 col-lg-12">
				<div id="spectrum-chat" className="chat-container"/>
			</div>
		</div>
		<div className="row">
			<div className="col-md-6 col-lg-6">
				<h4>Mean Energy: {meanEnergy}</h4>
			</div>
			<div className="col-md-6 col-lg-6">
				<h4>Energy: {segment.energy}</h4>
			</div>
		</div>
	</div>
);

Segment.propTypes = {
	segment: PropTypes.object.isRequired,
	meanEnergy: PropTypes.number.isRequired,
};

export default Segment;

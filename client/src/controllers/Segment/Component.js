import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Segment = ({ segment, meanEnergy }) =>
  (<div className="row m-t-15 segment">
    <div className="col-md-6 col-lg-6">
      <div id="segment-chat" className="chat-container" />
      <span>average: {segment.average}</span>
    </div>
    <div className="col-md-6 col-lg-6">
      <div id="spectrum-chat" className="chat-container" />
      <span>Mean Energy: {meanEnergy}</span>  <span>Energy: {segment.energy}</span>
    </div>
   </div>);

Segment.propTypes = {
	segment: PropTypes.object.isRequired,
	meanEnergy: PropTypes.number.isRequired,
};

export default Segment;

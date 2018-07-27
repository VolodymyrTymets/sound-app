import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Segment = ({ segment }) =>
  <div className="row m-t-15 segment">
    <div className="col-md-6 col-lg-6">
      <div id="segment-chat" className="chat-container">
      </div>
      <span>average: {segment.average}</span>
    </div>
    <div className="col-md-6 col-lg-6">
      <div id="spectrum-chat" className="chat-container">
      </div>
      <span>energy: {segment.energy}</span>
    </div>
  </div>;

Segment.propTypes = {
  segment: PropTypes.object.isRequired,
};

export default Segment;

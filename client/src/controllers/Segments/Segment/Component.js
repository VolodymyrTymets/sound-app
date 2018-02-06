import React from 'react';
import PropTypes from 'prop-types';


const Segment = ({ index }) =>
  <div className="row m-t-15">
    <div className="col-md-6 col-lg-6">
      <div id={`segment-chat-${index}`} className="chat-container">
      </div>
    </div>
    <div className="col-md-6 col-lg-6">
      <div id={`spectrum-chat-${index}`} className="chat-container">
      </div>
    </div>
  </div>;

Segment.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Segment;

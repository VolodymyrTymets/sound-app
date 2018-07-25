import React from 'react';
import PropTypes from 'prop-types';


const Segment = ({ index, segment, tissueType }) =>
  <div className="row m-t-15">
    <div className="col-md-6 col-lg-6">
      <div id={`segment-chat-${index}`} className="chat-container">
      </div>
      <span>average: {segment.average}</span>
    </div>
    <div className="col-md-6 col-lg-6">
      <div id={`spectrum-chat-${index}`} className="chat-container">
      </div>
      <span>energy: {segment.energy}</span>
    </div>
    <div className="col-md-12">
      <h3 className='text-center'>Tissue Type: {tissueType}</h3>
    </div>
  </div>;

Segment.propTypes = {
  index: PropTypes.number.isRequired,
  segment: PropTypes.object.isRequired,
  tissueType: PropTypes.string,
};

export default Segment;

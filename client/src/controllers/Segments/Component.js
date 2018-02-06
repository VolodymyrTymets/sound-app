import React from 'react';
import PropTypes from 'prop-types';
import Segment from './Segment';

const Segments = ({ segments }) =>
  <div className="row">
    <div className="col-md-12">
    {
      segments.map((segment, index) =>
        <Segment segment={segment} index={index} key={index} />)
    }
    </div>
  </div>;

Segments.propTypes = {
  segments: PropTypes.array.isRequired,
};

export default Segments;

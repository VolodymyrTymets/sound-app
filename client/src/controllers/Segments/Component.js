import React from 'react';
import PropTypes from 'prop-types';
import Segment from './Segment';

const Segments = ({ segments, tissueType }) =>
  <div className="row">
    <div className="col-md-12">
    {
      segments.map((segment, index) =>
        <Segment segment={segment} tissueType={tissueType} index={index} key={index} />)
    }
    </div>
  </div>;

Segments.propTypes = {
  segments: PropTypes.array.isRequired,
  tissueType:  PropTypes.string,
};

export default Segments;

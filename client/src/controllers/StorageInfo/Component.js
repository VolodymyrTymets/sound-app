import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ path }) =>
  (<div className="row">
    <div className="col-md-12 col-lg-12">
      <p>Path: {path}</p>
    </div>
   </div>);

Timer.propTypes = {
	path: PropTypes.string,
};

export default Timer;

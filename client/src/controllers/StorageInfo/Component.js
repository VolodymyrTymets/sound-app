import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ path, mic }) =>
  (<div className="row">
    <div className="col-md-12 col-lg-12">
      <p>Path: {path}</p>
      <p>Mic: {mic}</p>
    </div>
   </div>);

Timer.propTypes = {
	path: PropTypes.string,
  mic: PropTypes.string,
};

export default Timer;

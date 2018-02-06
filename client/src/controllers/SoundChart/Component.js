import React from 'react';
import PropTypes from 'prop-types';
import ToolBar from './ToolBar';
import RecordChart from './RecordChart';

const SoundChart = ({}) =>
  <div className="row">
    <div className="col-md-12">
     <ToolBar />
    </div>
    <div className="col-md-12">
      <RecordChart />
    </div>
  </div>;

SoundChart.propTypes = {

};

export default SoundChart;

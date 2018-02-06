import React from 'react';
import PropTypes from 'prop-types';
import ToolBar from './ToolBar';
import RecordChart from './RecordChart';

const SoundChart = ({}) =>
  <div className="row">
    <div className="col-md-12 m-t-15">
      <RecordChart />
    </div>
    <div className="col-md-12">
      <ToolBar />
    </div>
  </div>;

SoundChart.propTypes = {

};

export default SoundChart;

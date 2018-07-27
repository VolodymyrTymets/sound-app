import React from 'react';
import { connect } from "react-redux";
import { compose, withProps } from "recompose";

import { SoundChart, Segment } from '../controllers';
import "bootstrap/dist/css/bootstrap.css";

const MainPage = ({ getClassByTissueType, tissueType }) =>
  <div className="container-fluid" style={{ backgroundColor: getClassByTissueType(tissueType)}}>
    <div>
      <h4 className="text-center">Tissue: {tissueType}</h4>
      <SoundChart />
      <Segment />
    </div>
  </div>;

const enhance = compose(
  connect(state => ({
    tissueType: state.tissueType,
  })),
  withProps(({
    getClassByTissueType: (tissueType) => {
      if(tissueType == 'nerve') {
        return 'blue';
      }
      if(tissueType == 'muscle') {
        return 'green';
      }
      return 'white';
    },
  })),
);

export default enhance(MainPage);
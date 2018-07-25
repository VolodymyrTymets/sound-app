import React from 'react';
import { connect } from "react-redux";
import { compose, withProps } from "recompose";

import { SoundChart, Segments, SettingForm } from '../controllers';
import 'bootstrap/dist/css/bootstrap.css';



const MainPage = ({ getClassBytissueType, tissueType }) =>
  <div className="container" style={{ backgroundColor: getClassBytissueType(tissueType)}}>
    <SettingForm />
    <SoundChart />
    <Segments />
  </div>;

const enhance = compose(
  connect(state => ({
    tissueType: state.tissueType,
  })),
  withProps(({
    getClassBytissueType: (tissueType) => {
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
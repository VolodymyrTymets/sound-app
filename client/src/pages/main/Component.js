import React from 'react';
import { SoundChart, Segment } from '../../controllers';
import "bootstrap/dist/css/bootstrap.css";

const MainPage = ({ getClassByTissueType, tissueType }) =>
  <div className="container-fluid" style={{ backgroundColor: getClassByTissueType(tissueType)}}>
    <div>
      <h4 className="text-center">Tissue: {tissueType}</h4>
      <SoundChart />
      <Segment />
    </div>
  </div>;

export default MainPage;

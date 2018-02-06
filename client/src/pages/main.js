import React from 'react';
import { SoundChart, Segments } from '../controllers';
import 'bootstrap/dist/css/bootstrap.css';

const MainPage = ({}) =>
  <div className="container">
    <SoundChart />
    <Segments />
  </div>;

export default MainPage;

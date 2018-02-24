import React from 'react';
import { SoundChart, Segments, SettingForm } from '../controllers';
import 'bootstrap/dist/css/bootstrap.css';

const MainPage = ({}) =>
  <div className="container">
    <SettingForm />
    <SoundChart />
    <Segments />
  </div>;

export default MainPage;

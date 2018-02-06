import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles.css';

import MainPage from './pages/main';

const App = ({ store }) =>
  <Provider store={store}>
    <MuiThemeProvider>
      <MainPage />
    </MuiThemeProvider>
  </Provider>;

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import MainPage from './pages/main';

const App = ({ store }) =>
  <Provider store={store}>
    <MainPage />
  </Provider>;

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;

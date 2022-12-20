import React from 'react';
import AppNavigation from './navigation-layout/AppNavigation';
import {Provider} from 'react-redux';
import store from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;

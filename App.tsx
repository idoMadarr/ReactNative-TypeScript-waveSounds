import React from 'react';
import {I18nManager, LogBox} from 'react-native';
import AppNavigation from './navigation-layout/AppNavigation';
import {Provider} from 'react-redux';
import store from './redux/store';
import {SocketContext, socket} from './utils/socketIO';

LogBox.ignoreLogs([`new NativeEventEmitter()`]);

try {
  I18nManager.allowRTL(false);
} catch (error) {
  console.log(error);
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <AppNavigation />
      </SocketContext.Provider>
    </Provider>
  );
};

export default App;

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() =>
  require('../client/services/trackService'),
);

// Listening to Firebase Background & Quit Notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));

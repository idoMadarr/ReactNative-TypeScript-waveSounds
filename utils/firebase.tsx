import messaging from '@react-native-firebase/messaging';
import {saveToStorage} from './asyncStorage';

export const getFCMToekn = async () => {
  messaging()
    .getToken()
    .then(async token => {
      await saveToStorage('fcm', token);
    });
};

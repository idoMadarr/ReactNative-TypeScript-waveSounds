import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import {setModalMessage} from '../redux/slices/authSlice';
import store from '../redux/store';

GoogleSignin.configure();

export const getOAuthCredentials = async () => {
  let userCredentials = null;
  const hasPlayService = await GoogleSignin.hasPlayServices();

  if (hasPlayService) {
    await GoogleSignin.signIn()
      .then(async userInfo => {
        console.log(userInfo, 'userInfo');
        const {name, email} = userInfo.user;
        userCredentials = {username: name, email};
      })
      .catch(e => {
        store.dispatch(setModalMessage([{message: e.message}]));
      });
    console.log(userCredentials, 'userCredentials');

    return userCredentials;
  }
};

export const oauthSignout = async () => {
  await GoogleSignin.signOut();
};

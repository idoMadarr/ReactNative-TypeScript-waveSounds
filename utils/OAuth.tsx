import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import {setModalMessage} from '../redux/slices/authSlice';
import store from '../redux/store';

GoogleSignin.configure({
  //  @ts-ignore:
  androidClientId: Config.oauth_client_prod,
});

export const getOAuthCredentials = async () => {
  let userCredentials = null;
  const hasPlayService = await GoogleSignin.hasPlayServices();

  if (hasPlayService) {
    await GoogleSignin.signIn()
      .then(async userInfo => {
        const {name, email} = userInfo.user;
        userCredentials = {username: name, email};
      })
      .catch(e => {
        store.dispatch(setModalMessage([{message: e.message}]));
      });
    return userCredentials;
  }
};

export const oauthSignout = async () => {
  await GoogleSignin.signOut();
};

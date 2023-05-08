import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import {setModalMessage} from '../redux/slices/authSlice';
import store from '../redux/store';

// const androidClientId = __DEV__
//   ? Config.oauth_client_dev
//   : Config.oauth_client_prod;

GoogleSignin.configure({
  //  @ts-ignore:
  androidClientId:
    '1029253442024-qphf84d6ekjjfs60lo788ncpnjs5f5it.apps.googleusercontent.com',
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
        Alert.alert('notice2', JSON.stringify(e));

        store.dispatch(setModalMessage([{message: e.message}]));
      });
    return userCredentials;
  }
};

export const oauthSignout = async () => {
  await GoogleSignin.signOut();
};

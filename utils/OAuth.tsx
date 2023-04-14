import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

// const androidClientId = __DEV__
//   ? Config.oauth_client_dev
//   : Config.oauth_client_prod;

GoogleSignin.configure({
  //  @ts-ignore:
  androidClientId: Config.oauth_client_prod,
});

export const getOAuthCredentials = async () => {
  let userCredentials = null;

  try {
    const hasPlayService = await GoogleSignin.hasPlayServices();
    if (hasPlayService) {
      await GoogleSignin.signIn()
        .then(async userInfo => {
          const {name, email} = userInfo.user;
          userCredentials = {username: name, email};
        })
        .catch(e => {
          console.log('ERROR IS: ' + JSON.stringify(e));
        });
      return userCredentials;
    }
  } catch (error) {
    console.log(error, 'OAuth service error');
  }
};

export const oauthSignout = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

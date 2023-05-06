import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
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
    Alert.alert(hasPlayService.toString());
    if (hasPlayService) {
      await GoogleSignin.signIn()
        .then(async userInfo => {
          const {name, email} = userInfo.user;
          userCredentials = {username: name, email};
          Alert.alert(JSON.stringify(userCredentials));
        })
        .catch(e => {
          Alert.alert(JSON.stringify(e));
          console.log('ERROR IS: ' + JSON.stringify(e));
        });
      Alert.alert(JSON.stringify(userCredentials));
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

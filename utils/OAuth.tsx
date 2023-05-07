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
    if (hasPlayService) {
      await GoogleSignin.signIn()
        .then(async userInfo => {
          const {name, email} = userInfo.user;
          userCredentials = {username: name, email};
          Alert.alert('notice1', JSON.stringify(userCredentials));
        })
        .catch(e => {
          Alert.alert('notice2', JSON.stringify(e));
        });
      Alert.alert('notice3', JSON.stringify(userCredentials));
      return userCredentials;
    }
  } catch (error) {
    Alert.alert('notice4', JSON.stringify(error));
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

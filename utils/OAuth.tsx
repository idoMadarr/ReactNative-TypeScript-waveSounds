import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const oauthSignin = async () => {
  const androidClientId =
    '1029253442024-f9vvnrm4a2iogfv3n930vdi1fogdfrev.apps.googleusercontent.com';

  GoogleSignin.configure({
    //  @ts-ignore:
    androidClientId,
  });

  try {
    const hasPlayService = await GoogleSignin.hasPlayServices();
    if (hasPlayService) {
      GoogleSignin.signIn()
        .then(userInfo => {
          console.log(JSON.stringify(userInfo));
        })
        .catch(e => {
          console.log('ERROR IS: ' + JSON.stringify(e));
        });
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

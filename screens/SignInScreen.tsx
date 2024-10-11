import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {authorize} from 'react-native-app-auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '../redux/hooks';
import {googleOAuth, signIn} from '../redux/actions/authAction';
import {toggleSpinner} from '../redux/slices/authSlice';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/design/palette.json';
import GoogleVector from '../assets/vectors/google-auth.svg';
import {getFromStorage} from '../utils/asyncStorage';
import FaviconVector from '../assets/vectors/waveSounds-favicon.svg';
import {PropDimensions} from '../dimensions/dimensions';
import {navigate} from '../utils/rootNavigation';
import Config from 'react-native-config';

// Cpmponents
import LinkElement from '../components/resuable/LinkElement';
import TextElement from '../components/resuable/TextElement';
import InputElement from '../components/resuable/InputElement';
import ButtonElement from '../components/resuable/ButtonElement';
import StatusBarElement from '../components/resuable/StatusBarElement';

// Google OAuth key
const GOOGLE_OAUTH_APP_GUID = Config.google_oauth_key;

const config = {
  issuer: 'https://accounts.google.com',
  clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
  scopes: ['openid', 'profile', 'email'],
};

const defaultState = {
  email: '',
  password: '',
};

const defaultErrorState = {
  emailError: '',
  passwordError: '',
};

type RootStackParamList = {
  ['sign-in']: any;
};

type SignInScreenType = NativeStackScreenProps<RootStackParamList, 'sign-in'>;

const SignInScreen: React.FC<SignInScreenType> = () => {
  const isFocused = useIsFocused();

  const [formState, setFormState] = useState(defaultState);
  const [formErrorState, setFormErrorState] = useState(defaultErrorState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {email, password} = formState;
  const {emailError, passwordError} = formErrorState;
  const dispatch = useAppDispatch();
  const inputEmailRef: any = useRef();
  const inputPasswordRef: any = useRef();

  useEffect(() => {
    if (email.includes('.com')) {
      inputPasswordRef.current?.focus();
    }
    if (password.length === 8 && email.includes('.com')) {
      Keyboard.dismiss();
    }
  }, [email, password]);

  const updateState = (
    name: string,
    value: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setFormState(prevState => ({...prevState, [name]: value}));
  };

  const togglePasswordMode = () => setSecureTextEntry(!secureTextEntry);

  const formValidator = () => {
    let emailErr: null | string = null;
    let passwordErr: null | string = null;

    if (email.trim() === '' || !email.includes('@'))
      emailErr = 'Valid email is required';
    if (password.length < 8)
      passwordErr = 'Password must be at least 8 characters long';

    if (emailErr || passwordErr) {
      setFormErrorState(prevState => ({
        ...prevState,
        emailError: emailErr!,
        passwordError: passwordErr!,
      }));
      return false;
    }
    return true;
  };

  const onPress = async () => {
    Keyboard.dismiss();
    const isValidForm = formValidator();
    if (isValidForm) {
      const fcmToken = await getFromStorage('fcm');
      dispatch(toggleSpinner());
      dispatch(signIn({...formState, email: email.toLowerCase(), fcmToken}));
    }
  };

  const onGoogleOAuth = async () => {
    dispatch(toggleSpinner());
    const googleAuthCredentials = await authorize(config);
    const accessToken = googleAuthCredentials.accessToken;
    dispatch(googleOAuth(accessToken));
  };

  const signupNavigate = () => {
    navigate('auth', {screen: 'sign-up'});
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <LinearGradient
        style={styles.mainContainer}
        colors={[Colors.primary, Colors['primary-shadow'], Colors.primary]}>
        {isFocused && (
          <Animated.View entering={FadeInDown.springify()}>
            <View style={styles.formContainer}>
              <FaviconVector height={100} width={100} />
              <TextElement fontSize={'xl'} fontWeight={'bold'}>
                Any Song - Anywhere!
              </TextElement>
              <View>
                <TouchableOpacity
                  onPress={onGoogleOAuth}
                  style={styles.googleIcon}>
                  <GoogleVector />
                  <TextElement fontWeight={'bold'} cStyle={styles.socialLogin}>
                    Continue with Google
                  </TextElement>
                </TouchableOpacity>
                <InputElement
                  inputRef={inputEmailRef}
                  value={email}
                  onChange={updateState.bind(this, 'email')}
                  placeholder={'Email Address'}
                  errorMessage={emailError}
                />
                <InputElement
                  inputRef={inputPasswordRef}
                  value={password}
                  onChange={updateState.bind(this, 'password')}
                  placeholder={'Password'}
                  icon={'eye-slash'}
                  errorMessage={passwordError}
                  secureTextEntry={secureTextEntry}
                  setSecureTextEntry={togglePasswordMode}
                />
                <ButtonElement
                  title={'Log In'}
                  titleColor={Colors.black}
                  onPress={onPress}
                  backgroundColor={Colors.active}
                />
              </View>
            </View>
            <View style={styles.mainContainer}>
              <LinkElement url={'forgot-password'}>''</LinkElement>
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <TextElement cStyle={{color: Colors.greyish}}>OR</TextElement>
                <View style={styles.line} />
              </View>
              <TextElement>*New to waveSounds?</TextElement>
              <ButtonElement
                title={'Create an account'}
                titleColor={Colors.active}
                onPress={signupNavigate}
                backgroundColor={Colors.transparent}
                customStyle={{borderWidth: 1, borderColor: Colors.active}}
              />
            </View>
          </Animated.View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  mainContainer: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 8,
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: PropDimensions.inputWidth,
    marginVertical: 16,
  },
  socialLogin: {
    color: Colors.black,
    marginHorizontal: 8,
  },
  line: {
    width: '45%',
    height: 1,
    backgroundColor: Colors.greyish,
  },
  googleIcon: {
    width: PropDimensions.inputWidth,
    height: PropDimensions.inputHight,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 24,
  },
});

export default SignInScreen;

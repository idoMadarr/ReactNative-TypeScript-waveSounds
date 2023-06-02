import React, {useState} from 'react';
import {
  View,
  // TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  SafeAreaView,
  Dimensions,
  Keyboard,
} from 'react-native';
// import Crashes from 'appcenter-crashes';
import Animated, {FadeInDown, FadeInLeft} from 'react-native-reanimated';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '../redux/hooks';
import {googleOAuth, signIn} from '../redux/actions/authAction';
import {toggleSpinner} from '../redux/slices/authSlice';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/design/palette.json';
// @ts-ignore:
// import GoogleVector from '../assets/vectors/icon_google.svg';
// @ts-ignore:
import FaviconVector from '../assets/vectors/waveSounds-favicon.svg';
import {getOAuthCredentials} from '../utils/OAuth';

// Cpmponents
import LinkElement from '../components/resuable/LinkElement';
import TextElement from '../components/resuable/TextElement';
import InputElement from '../components/resuable/InputElement';
import ButtonElement from '../components/resuable/ButtonElement';
import {PropDimensions} from '../dimensions/dimensions';
import StatusBarElement from '../components/resuable/StatusBarElement';

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
  const [formState, setFormState] = useState(defaultState);
  const [formErrorState, setFormErrorState] = useState(defaultErrorState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {email, password} = formState;
  const {emailError, passwordError} = formErrorState;
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

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
    // Testing integration for crashes in appcenter
    // Crashes.generateTestCrash();
    Keyboard.dismiss();
    const isValidForm = formValidator();
    if (isValidForm) {
      dispatch(toggleSpinner());
      dispatch(signIn({...formState, email: formState.email.toLowerCase()}));
    }
  };

  const onGoogleOAuth = async () => {
    const credentials = (await getOAuthCredentials()) as any;
    if (!credentials) return;
    dispatch(toggleSpinner());
    dispatch(googleOAuth(credentials));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <LinearGradient
        style={styles.mainContainer}
        colors={[
          Colors['gradient-end'],
          Colors['gradient-mid'],
          Colors['gradient-end'],
        ]}>
        {isFocused && (
          <Animated.View
            entering={FadeInLeft.springify()}
            style={styles.headerContainer}>
            <FaviconVector height={50} width={50} />
            <TextElement
              fontSize={'xl'}
              fontWeight={'bold'}
              cStyle={{color: Colors.white}}>
              WaveSounds
            </TextElement>
            <TextElement>
              WaveSounds is a digital music that gives you access to millions of
              songs and other content from creators all over the world. Basic
              functions such as playing music are totally free.
            </TextElement>
          </Animated.View>
        )}
        {isFocused && (
          <Animated.View entering={FadeInDown}>
            <View style={styles.fieldsContainer}>
              <InputElement
                value={email}
                onChange={updateState.bind(this, 'email')}
                placeholder={'Email'}
                icon={'envelope-o'}
                errorMessage={emailError}
              />
              <InputElement
                value={password}
                onChange={updateState.bind(this, 'password')}
                placeholder={'Password'}
                icon={'eye-slash'}
                errorMessage={passwordError}
                secureTextEntry={secureTextEntry}
                setSecureTextEntry={togglePasswordMode}
              />
              <ButtonElement
                title={'LOG IN'}
                titleColor={Colors.black}
                onPress={onPress}
                backgroundColor={Colors.active}
              />
              <View style={styles.linkContainer}>
                <TextElement>Dont have account yet? </TextElement>
                <LinkElement url={'sign-up'}> Sign up</LinkElement>
              </View>
            </View>
            <View style={styles.socialLogin}>
              {/* <View style={styles.socialLoginHeader}>
                <View style={styles.line}></View>
                <TextElement>Or connect with</TextElement>
                <View style={styles.line}></View>
              </View>
              <TouchableOpacity
                onPress={onGoogleOAuth}
                style={styles.googleIcon}>
                <GoogleVector />
              </TouchableOpacity> */}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: PropDimensions.buttonWidth,
  },
  fieldsContainer: {
    height: Dimensions.get('window').height * 0.5,
  },
  linkContainer: {
    marginVertical: 8,
    width: PropDimensions.buttonWidth,
    flexDirection: 'row',
  },
  socialLogin: {
    alignItems: 'center',
  },
  socialLoginHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: '25%',
    marginHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: Colors.greyish,
  },
  googleIcon: {
    width: 50,
    marginVertical: 12,
    alignSelf: 'center',
  },
});

export default SignInScreen;

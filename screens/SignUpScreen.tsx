import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch} from '../redux/hooks';
import {toggleSpinner} from '../redux/slices/authSlice';
import {signUp} from '../redux/actions/authAction';
import {useIsFocused} from '@react-navigation/native';
import Animated, {FadeInUp} from 'react-native-reanimated';
import Colors from '../assets/design/palette.json';
import FaviconVector from '../assets/vectors/waveSounds-favicon.svg';

// Cpmponents
import LinkElement from '../components/resuable/LinkElement';
import TextElement from '../components/resuable/TextElement';
import InputElement from '../components/resuable/InputElement';
import ButtonElement from '../components/resuable/ButtonElement';
import StatusBarElement from '../components/resuable/StatusBarElement';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getFromStorage} from '../utils/asyncStorage';

const defaultState = {
  email: '',
  username: '',
  password: '',
};

const defaultErrorState = {
  emailError: '',
  usernameError: '',
  passwordError: '',
};

type RootStackParamList = {
  ['sign-up']: any;
};

type SignUpScreenType = NativeStackScreenProps<RootStackParamList, 'sign-up'>;

const SignInScreen: React.FC<SignUpScreenType> = ({navigation}) => {
  const [formState, setFormState] = useState(defaultState);
  const [formErrorState, setFormErrorState] = useState(defaultErrorState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {email, username, password} = formState;
  const {emailError, usernameError, passwordError} = formErrorState;
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
    let usernameErr: null | string = null;
    let passwordErr: null | string = null;

    if (email.trim() === '' || !email.includes('@'))
      emailErr = 'Valid email is required';
    if (username.trim() === '') usernameErr = 'Username must be set';
    if (password.length < 8)
      passwordErr = 'Password must be at least 8 characters long';

    if (emailErr || passwordErr || usernameErr) {
      setFormErrorState(prevState => ({
        ...prevState,
        emailError: emailErr!,
        passwordError: passwordErr!,
        usernameError: usernameErr!,
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
      dispatch(signUp({...formState, fcmToken}));
    }
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
          <Animated.View entering={FadeInUp.springify()}>
            <KeyboardAvoidingView
              behavior={'height'}
              style={styles.formContainer}>
              <FaviconVector height={100} width={100} />
              <TextElement
                cStyle={{textAlign: 'center'}}
                fontSize={'xl'}
                fontWeight={'bold'}>
                Sign up for a free waveSounds account
              </TextElement>
              <TextElement cStyle={{textAlign: 'center'}}>
                WaveSounds is a digital music that gives you access to millions
                of songs and other content from creators all over the world.
              </TextElement>
              <View style={styles.title}>
                <InputElement
                  value={email}
                  onChange={updateState.bind(this, 'email')}
                  placeholder={'Email'}
                  icon={'envelope-o'}
                  errorMessage={emailError}
                />
                <InputElement
                  value={username}
                  onChange={updateState.bind(this, 'username')}
                  placeholder={'Username'}
                  icon={'user-circle-o'}
                  errorMessage={usernameError}
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
                  title={'Continue'}
                  titleColor={Colors.black}
                  onPress={onPress}
                  backgroundColor={Colors.active}
                />
              </View>
            </KeyboardAvoidingView>
            <View style={styles.mainContainer}>
              <LinkElement url={'sign-in'}>
                Already have an account?
              </LinkElement>
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
    alignItems: 'center',
  },
  formContainer: {
    height: '94%',
    width: '85%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    marginVertical: 32,
  },
});

export default SignInScreen;

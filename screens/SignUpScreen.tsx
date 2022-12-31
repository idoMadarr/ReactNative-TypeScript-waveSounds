import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Colors from '../assets/design/palette.json';

// Cpmponents
import LinkElement from '../components/resuable/LinkElement';
import TextElement from '../components/resuable/TextElement';
import InputElement from '../components/resuable/InputElement';
import ButtonElement from '../components/resuable/ButtonElement';
import {PropDimensions} from '../dimensions/dimensions';
import StatusBarElement from '../components/resuable/StatusBarElement';

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

const SignInScreen = () => {
  const [formState, setFormState] = useState(defaultState);
  const [formErrorState, setFormErrorState] = useState(defaultErrorState);
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const {email, username, password} = formState;
  const {emailError, usernameError, passwordError} = formErrorState;

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

  const onPress = () => {
    const isValidForm = formValidator();
    console.log(isValidForm);
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
        <View
          style={{
            width: PropDimensions.buttonWidth,
            marginVertical: 10,
          }}>
          <TextElement>
            We're more than a distributor. From Unlimited Guides & Master
            Classes, to showcasing top TuneCore talent across the globe, to the
            latest breaking news & partnerships.
          </TextElement>
        </View>
        <InputElement
          value={email}
          onChange={updateState.bind(this, 'email')}
          placeholder={'Email'}
          icon={'envelope-o'}
          errorMessage={emailError}
        />
        <InputElement
          value={email}
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
          title={'SIGN UP'}
          titleColor={Colors.black}
          onPress={onPress}
          backgroundColor={Colors.active}
        />
        <View style={styles.linkContainer}>
          <TextElement>Already have an account? </TextElement>
          <LinkElement url={'sign-in'}> Sign In</LinkElement>
        </View>
        <View
          style={{
            width: PropDimensions.buttonWidth,
            marginVertical: 10,
          }}>
          <TextElement>
            WaveSounds Doesn't Stop... We'll get your music on more than 150
            digital music stores and social platforms, including Apple Music,
            TikTok, YouTube, Tidal, Tencent and more. Keep 100% ownership of
            your music and stay in control of your career.
          </TextElement>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  linkContainer: {
    marginVertical: 8,
    width: PropDimensions.buttonWidth,
    flexDirection: 'row',
  },
});

export default SignInScreen;

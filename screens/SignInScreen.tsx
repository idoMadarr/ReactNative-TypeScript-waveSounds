import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  SafeAreaView,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  SlideInDown,
  SlideInLeft,
} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';
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
  password: '',
};

const defaultErrorState = {
  emailError: '',
  passwordError: '',
};

const SignInScreen = () => {
  const [formState, setFormState] = useState(defaultState);
  const [formErrorState, setFormErrorState] = useState(defaultErrorState);
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const {email, password} = formState;
  const {emailError, passwordError} = formErrorState;
  const isFocused = useIsFocused();

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
        {isFocused && (
          <Animated.View
            entering={FadeInLeft.springify()}
            style={{
              width: PropDimensions.buttonWidth,
              marginVertical: 10,
            }}>
            <TextElement
              fontSize={'xl'}
              fontWeight={'bold'}
              cStyle={{color: Colors.white}}>
              waveSounds
            </TextElement>
            <TextElement>
              WaveSounds is a digital music, podcast, and video service that
              gives you access to millions of songs and other content from
              creators all over the world. Basic functions such as playing music
              are totally free, but you can also choose to upgrade to Spotify
              Premium.
            </TextElement>
          </Animated.View>
        )}
        {isFocused && (
          <Animated.View entering={FadeInDown}>
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

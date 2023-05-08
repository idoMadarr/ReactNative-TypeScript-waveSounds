import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch} from '../redux/hooks';
import {toggleSpinner} from '../redux/slices/authSlice';
import {signUp} from '../redux/actions/authAction';
import {useIsFocused} from '@react-navigation/native';
import Animated, {FadeInDown, FadeInLeft} from 'react-native-reanimated';
import Colors from '../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore:
import FaviconVector from '../assets/vectors/waveSounds-favicon.svg';

// Cpmponents
import LinkElement from '../components/resuable/LinkElement';
import TextElement from '../components/resuable/TextElement';
import InputElement from '../components/resuable/InputElement';
import ButtonElement from '../components/resuable/ButtonElement';
import {PropDimensions} from '../dimensions/dimensions';
import StatusBarElement from '../components/resuable/StatusBarElement';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface ApiError {
  message: string;
  field: string;
}

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
      dispatch(toggleSpinner());
      dispatch(signUp(formState));
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
        colors={[
          Colors['gradient-end'],
          Colors['gradient-mid'],
          Colors['gradient-end'],
        ]}>
        {isFocused && (
          <Animated.View entering={FadeInDown} style={styles.section}>
            <TextElement cStyle={styles.mainTitle}>
              We're more than a distributor. From Unlimited Guides & Master
              Classes, to showcasing top TuneCore talent across the globe, to
              the latest breaking news & partnerships.
            </TextElement>
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
              title={'SIGN UP'}
              titleColor={Colors.black}
              onPress={onPress}
              backgroundColor={Colors.active}
            />
            <View style={styles.linkContainer}>
              <TextElement>Already have an account? </TextElement>
              <LinkElement url={'sign-in'}> Sign In</LinkElement>
            </View>
          </Animated.View>
        )}
        <Animated.View entering={FadeInLeft.springify()} style={styles.section}>
          <TextElement>
            WaveSounds Doesn't Stop... We'll get your music on more than 150
            digital music stores and social platforms, including Apple Music,
            TikTok, YouTube, Tidal, Tencent and more. Keep 100% ownership of
            your music and stay in control of your career.
          </TextElement>
          <View style={{alignItems: 'center'}}>
            <FaviconVector height={80} width={80} />
          </View>
        </Animated.View>
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
  },
  linkContainer: {
    marginVertical: 8,
    width: PropDimensions.buttonWidth,
    flexDirection: 'row',
  },
  section: {
    width: PropDimensions.buttonWidth,
  },
  mainTitle: {
    paddingBottom: 8,
  },
});

export default SignInScreen;

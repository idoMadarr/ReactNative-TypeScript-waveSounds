import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  SafeAreaView,
} from 'react-native';
import Animated, {FadeInDown, FadeInLeft} from 'react-native-reanimated';
import {useAppDispatch} from '../redux/hooks';
import {toggleSpinner} from '../redux/slices/authSlice';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
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
import {signIn} from '../redux/actions/authAction';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface ApiError {
  message: string;
  field: string;
}

const defaultState = {
  email: '',
  password: '',
};

const defaultErrorState = {
  emailError: '',
  passwordError: '',
  apiError: [],
};

type RootStackParamList = {
  signin: any;
};

type SignInScreenType = NativeStackScreenProps<RootStackParamList, 'signin'>;

const SignInScreen: React.FC<SignInScreenType> = ({navigation}) => {
  const [formState, setFormState] = useState(defaultState);
  const [formErrorState, setFormErrorState] = useState(defaultErrorState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {email, password} = formState;
  const {emailError, passwordError, apiError} = formErrorState;
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
    const isValidForm = formValidator();
    if (isValidForm) {
      dispatch(toggleSpinner());
      const errors = await dispatch(signIn(formState));
      if (errors) {
        return setFormErrorState(prevState => ({
          ...prevState,
          apiError: errors.errors,
        }));
      }
      // @ts-ignore:
      navigation.navigate('loading');
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
          <Animated.View
            entering={FadeInLeft.springify()}
            style={{
              width: PropDimensions.buttonWidth,
              marginVertical: 10,
            }}>
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
        <View style={styles.errorList}>
          {apiError.map((error: ApiError) => (
            <View style={styles.errorContainer} key={Math.random()}>
              <Icon name={'exclamation'} size={18} color={Colors.warning} />
              <TextElement
                fontSize={'sm'}
                cStyle={styles.errorText}
                fontWeight={'bold'}>
                {error.message}
              </TextElement>
            </View>
          ))}
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
  errorList: {
    alignItems: 'flex-start',
    minHeight: '8%',
    width: PropDimensions.buttonWidth,
  },
  errorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  errorText: {
    marginHorizontal: 8,
    color: Colors.warning,
  },
});

export default SignInScreen;

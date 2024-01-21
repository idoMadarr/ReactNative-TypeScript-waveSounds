import {useCallback, useContext, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, SafeAreaView, Dimensions, Alert} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import Lottie from 'lottie-react-native';
import {fetchDeezerChart, fetchSequences} from '../redux/actions/deezerActions';
import {setAuthentication} from '../redux/slices/authSlice';
import {fetchFavorites} from '../redux/actions/authAction';
import {getFromStorage} from '../utils/asyncStorage';
import {SocketContext} from '../utils/socketIO';
import Colors from '../assets/design/palette.json';
import Crashes from 'appcenter-crashes';
import {getFCMToekn} from '../utils/firebase';
import FaviconVector from '../assets/vectors/waveSounds-favicon.svg';

// Components
import StatusBarElement from '../components/resuable/StatusBarElement';
import TextElement from '../components/resuable/TextElement';
import LinearGradient from 'react-native-linear-gradient';
import {PropDimensions} from '../dimensions/dimensions';

const faviconSize = Dimensions.get('window').width * 0.25;

type RootStackParamList = {
  loading: any;
  tabs: undefined;
};

type LoadingScreenType = NativeStackScreenProps<RootStackParamList, 'loading'>;

const LoadingScreen: React.FC<LoadingScreenType> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext) as any;

  useFocusEffect(
    useCallback(() => {
      const initialization = async () => {
        setTimeout(() => {
          initApp();
        }, 2000);
      };
      initialization();
    }, []),
  );

  // Check if the app crash in the last time in used
  useEffect(() => {
    // checkPreviousSession();
  }, []);

  const checkPreviousSession = async () => {
    const didCrash: boolean = await Crashes.hasCrashedInLastSession();

    if (didCrash) {
      // const report = await Crashes.lastSessionCrashReport();
      Alert.alert(
        'Ops!',
        `Sorry about that crash, we're working on a solution`,
      );
    }
  };

  const initApp = async () => {
    const session = await getFromStorage('userSession');
    if (!session?.userJwt) {
      // @ts-ignore:
      return navigation.navigate('auth');
    }

    getFCMToekn();
    await dispatch(fetchFavorites());
    await dispatch(fetchDeezerChart());
    await dispatch(fetchSequences());
    await dispatch(setAuthentication(session.user));
    await socket.connect();
    socket.emit('auth', session.user);
    // @ts-ignore:
    navigation.navigate('app');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement barStyle={'light-content'} backgroundColor="#0E1013" />
      <LinearGradient
        style={styles.main}
        colors={[Colors.primary, Colors['primary-shadow'], Colors.primary]}>
        <View style={styles.title}>
          <FaviconVector height={faviconSize} width={faviconSize} />
          <TextElement fontSize={'xl'}>waveSounds</TextElement>
        </View>
        <Lottie
          source={require('../assets/lottie/waves.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  main: {
    flex: 1,
    width: '100%',
  },
  title: {
    flex: 1,
    paddingBottom: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    position: 'absolute',
    top: '45%',
    height: 200,
    width: PropDimensions.fullWidth,
  },
});

export default LoadingScreen;

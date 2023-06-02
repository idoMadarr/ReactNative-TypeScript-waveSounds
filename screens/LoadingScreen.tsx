import {useCallback, useContext, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, SafeAreaView, Dimensions, Alert} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import Lottie from 'lottie-react-native';
import {fetchDeezerChart, fetchSequences} from '../redux/actions/deezerActions';
import {setAuthentication} from '../redux/slices/authSlice';
import {fetchFavorites, fetchOnlines} from '../redux/actions/authAction';
import {getFromStorage} from '../utils/asyncStorage';
import {SocketContext} from '../utils/socketIO';
import Colors from '../assets/design/palette.json';
import Crashes from 'appcenter-crashes';
// @ts-ignore:
import FaviconVector from '../assets/vectors/waveSounds-favicon.svg';

// Components
import StatusBarElement from '../components/resuable/StatusBarElement';
import TextElement from '../components/resuable/TextElement';

const faviconSize = Dimensions.get('window').width * 0.45;

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
    checkPreviousSession();
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
    await dispatch(fetchFavorites());
    await dispatch(fetchDeezerChart());
    await dispatch(fetchSequences());
    await dispatch(fetchOnlines());
    await dispatch(setAuthentication(session.user));
    await socket.connect();
    socket.emit('auth', session);
    // @ts-ignore:
    navigation.navigate('app');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <View style={styles.title}>
        <FaviconVector height={faviconSize} width={faviconSize} />
        <TextElement fontSize={'xl'} fontWeight={'bold'}>
          waveSounds
        </TextElement>
      </View>
      <Lottie
        source={require('../assets/lottie/loader.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <TextElement cStyle={styles.wait}>Please wait few moments...</TextElement>
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
  title: {
    alignItems: 'center',
    color: Colors.secondary,
  },
  wait: {
    position: 'absolute',
    bottom: '40%',
    color: Colors.white,
  },
  lottie: {
    width: 150,
    height: 150,
  },
});

export default LoadingScreen;

import {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Lottie from 'lottie-react-native';
import {fetchDeezerChart, fetchSequences} from '../redux/actions/deezerActions';
import {setAuthentication} from '../redux/slices/authSlice';
import {fetchFavorites} from '../redux/actions/authAction';
import {getFromStorage} from '../utils/asyncStorage';
import Colors from '../assets/design/palette.json';
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
  const progress = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      const initialization = async () => {
        initClockLoader();
        setTimeout(() => {
          initApp();
        }, 2000);
      };
      initialization();
    }, []),
  );

  const initApp = async () => {
    const session = await getFromStorage('userSession');

    if (!session?.userJwt) {
      // @ts-ignore:
      return navigation.navigate('auth');
    }

    await dispatch(fetchFavorites());
    await dispatch(fetchDeezerChart());
    await dispatch(fetchSequences());
    await dispatch(
      setAuthentication(
        session.existUser || session.createUser || session.user,
      ),
    );
    // @ts-ignore:
    navigation.navigate('app');
  };

  const initClockLoader = () => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
    );
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
        style={{width: 250}}
      />
      <TextElement cStyle={styles.wait}>Just few moments...</TextElement>
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
});

export default LoadingScreen;

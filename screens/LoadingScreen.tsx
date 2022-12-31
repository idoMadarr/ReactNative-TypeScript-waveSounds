import {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {fetchDeezerChart, fetchSequences} from '../redux/actions/deezerActions';
import Colors from '../assets/design/palette.json';

// Components
import StatusBarElement from '../components/resuable/StatusBarElement';
import ClockLoader from '../components/ClockLoader';
import TextElement from '../components/resuable/TextElement';

type RootStackParamList = {
  loading: any;
  tabs: undefined;
};

type LoadingScreenType = NativeStackScreenProps<RootStackParamList, 'loading'>;

const LoadingScreen: React.FC<LoadingScreenType> = ({navigation}) => {
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  const dispatch = useAppDispatch();
  const progress = useSharedValue(0);

  useEffect(() => {
    initClockLoader();
    setTimeout(() => {
      initApp();
    }, 2000);
  }, []);

  const initApp = async () => {
    if (isAuth) {
      await dispatch(fetchDeezerChart());
      await dispatch(fetchSequences());
      // @ts-ignore:
      return navigation.navigate('app');
    }
    // @ts-ignore:
    navigation.navigate('auth');
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
      <TextElement cStyle={styles.title} fontSize={'xl'}>
        waveSounds
      </TextElement>
      <ClockLoader progress={progress} />
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
    position: 'absolute',
    top: '25%',
    color: Colors.secondary,
  },
});

export default LoadingScreen;

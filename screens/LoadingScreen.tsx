import {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {fetchDeezerChart} from '../redux/actions/deezerActions';
import Colors from '../assets/design/palette.json';

// Components
import ClockLoader from '../components/ClockLoader';
import TextElement from '../components/resuable/TextElement';

const LoadingScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const progress = useSharedValue(0);

  useEffect(() => {
    initClockLoader();
    setTimeout(() => {
      initApp();
    }, 3000);
  }, []);

  const initApp = async () => {
    await dispatch(fetchDeezerChart());
    navigation.navigate('tabs');
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

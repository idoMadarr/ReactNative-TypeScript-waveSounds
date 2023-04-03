import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';
import {PropDimensions} from '../dimensions/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import Lottie from 'lottie-react-native';

// Components
import TextElement from './resuable/TextElement';
import Animated, {
  Easing,
  FadeInLeft,
  FadeOutRight,
  Layout,
  SlideInDown,
} from 'react-native-reanimated';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';
import Sound from 'react-native-sound';
import {setCurrentTrack, setFloatingPlayer} from '../redux/slices/deezerSlice';

const END_REACH = 240;

interface ModalPlayerType {
  playerStatus: boolean;
  setPlayerStatus: Function;
  timeLeft: number;
  setTimeLeft: Function;
  closeModal(): void;
}

const ModalPlayer: React.FC<ModalPlayerType> = ({
  playerStatus,
  timeLeft,
  setTimeLeft,
  setPlayerStatus,
}) => {
  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack);
  const modalContext = useAppSelector(state => state.deezerSlice.modalContext);
  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  )!;

  const dispatch = useAppDispatch();

  const contextIndexRef = useRef(
    // @ts-ignore:
    modalContext.findIndex(item => item.preview === currentTrack._filename),
  );

  const onPlay = () => {
    setPlayerStatus(true);
    currentTrack?.play();
  };

  const onPause = () => {
    setPlayerStatus(false);
    currentTrack?.pause();
  };

  const onSlidingComplete = (current: any) => {
    setTimeLeft(parseInt(current));
    currentTrack?.setCurrentTime(current);
    onPlay();
  };

  const onTrackNavigate = (action: number) => {
    let nextTrack = modalContext[contextIndexRef.current + action] as any;
    if (!nextTrack) {
      nextTrack = modalContext[0];
      contextIndexRef.current = 0;
    } else {
      contextIndexRef.current = contextIndexRef.current + action;
    }

    const createFloatingTrack = new FloatingPlayerInstance(
      nextTrack.title,
      nextTrack.artist,
      nextTrack.image,
    );

    const loadNextTrack = new Sound(nextTrack.preview, '', async () => {
      if (currentTrack) {
        // @ts-ignore:
        currentTrack.stop(() => {
          currentTrack.release();
          dispatch(setFloatingPlayer(createFloatingTrack));
          dispatch(setCurrentTrack(loadNextTrack));
          setPlayerStatus(true);
          setTimeLeft(0);
        });
      } else {
        dispatch(setFloatingPlayer(createFloatingTrack));
        dispatch(setCurrentTrack(loadNextTrack));
        setPlayerStatus(true);
        setTimeLeft(0);
      }
    });
  };

  return (
    <LinearGradient
      colors={[Colors['gradient--modal-start'], Colors['gradient-modal-end']]}
      style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <View style={styles.imageContainer}>
          <Animated.Image
            entering={SlideInDown}
            layout={Layout.duration(300).springify().stiffness(50)}
            source={{uri: floatingPlayer.image}}
            style={styles.image}
          />
          <Icon
            name={'music'}
            size={32}
            color={Colors.white}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.progressContainer}>
        {playerStatus && (
          <Animated.View
            entering={FadeInLeft}
            exiting={FadeOutRight}
            style={styles.lottieContainer}>
            <Lottie
              source={require('../assets/lottie/waves.json')}
              autoPlay
              loop
              style={{width: PropDimensions.fullWidth}}
            />
          </Animated.View>
        )}
        <TextElement fontWeight={'bold'} cStyle={styles.text}>
          {floatingPlayer.title}
        </TextElement>
        <TextElement fontSize={'sm'} cStyle={styles.text}>
          {floatingPlayer.artist}
        </TextElement>
        <Slider
          value={timeLeft}
          style={{width: END_REACH, height: 40}}
          minimumValue={0}
          maximumValue={currentTrack?._duration || 30}
          minimumTrackTintColor={Colors.white}
          maximumTrackTintColor={Colors.light}
          onSlidingComplete={onSlidingComplete}
        />
      </View>
      <View style={styles.controllerContainer}>
        <TouchableOpacity onPress={onTrackNavigate.bind(this, -1)}>
          <Icon name={'backward'} size={28} color={Colors.secondary} />
        </TouchableOpacity>
        {playerStatus ? (
          <TouchableOpacity onPress={onPause}>
            <Icon name={'pause'} size={28} color={Colors.secondary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPlay}>
            <Icon name={'play'} size={28} color={Colors.active} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onTrackNavigate.bind(this, 1)}>
          <Icon name={'forward'} size={28} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: PropDimensions.maxModalHeight,
  },
  modalHeader: {
    height: '65%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageContainer: {
    width: 250,
    height: 250,
    elevation: 0,
  },
  image: {
    borderRadius: 150,
    width: '100%',
    height: '100%',
    zIndex: 50,
  },
  text: {
    width: 280,
    color: Colors.white,
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    top: '-10%',
    left: '44%',
    zIndex: 100,
  },
  progressContainer: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controllerContainer: {
    height: '10%',
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  active: {
    color: Colors.active,
  },
  lottieContainer: {
    position: 'absolute',
    bottom: -20,
    zIndex: 0,
    width: PropDimensions.fullWidth,
  },
});

export default ModalPlayer;

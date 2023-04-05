import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';
import {PropDimensions} from '../dimensions/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import Lottie from 'lottie-react-native';

// Components
import TextElement from './resuable/TextElement';
import Animated, {
  FadeInLeft,
  FadeOutRight,
  SlideInDown,
} from 'react-native-reanimated';

interface ModalPlayerType {
  playerStatus: boolean;
  setPlayerStatus: Function;
  timeLeft: number;
  setTimeLeft: Function;
  onTrackNavigate(action: number): void;
  closeModal(): void;
}

const ModalPlayer: React.FC<ModalPlayerType> = ({
  playerStatus,
  timeLeft,
  setTimeLeft,
  onTrackNavigate,
  setPlayerStatus,
}) => {
  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack);
  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  )!;
  const favoritesObj = useAppSelector(state => state.authSlice.favoritesObj);
  // @ts-ignore:
  const isFavorite = favoritesObj[floatingPlayer.id];

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

  return (
    <LinearGradient
      colors={[Colors['gradient--modal-start'], Colors['gradient-modal-end']]}
      style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <View style={styles.imageContainer}>
          <Animated.Image
            entering={SlideInDown.duration(300).springify().stiffness(50)}
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
        <Slider
          value={timeLeft}
          style={{width: 240, height: 40, zIndex: 100}}
          minimumValue={0}
          maximumValue={parseInt(currentTrack?._duration || 29)}
          minimumTrackTintColor={Colors.white}
          maximumTrackTintColor={Colors.light}
          onSlidingComplete={onSlidingComplete}
        />
        <TextElement fontWeight={'bold'} cStyle={styles.text}>
          {floatingPlayer.title}
        </TextElement>
        <TextElement fontSize={'sm'} cStyle={styles.text}>
          {floatingPlayer.artist}
        </TextElement>
        <TouchableOpacity style={styles.liked} onPress={() => {}}>
          <Icon
            name={'heart'}
            size={28}
            color={isFavorite ? Colors.active : Colors.secondary}
          />
        </TouchableOpacity>
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
  liked: {
    position: 'absolute',
    bottom: '20%',
    right: '10%',
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

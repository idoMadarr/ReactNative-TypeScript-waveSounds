import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {addFavorite, deleteFavorite} from '../redux/actions/authAction';
import Animated, {
  FadeInLeft,
  FadeOutRight,
  SlideInDown,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';
import {PropDimensions} from '../dimensions/dimensions';
import {TrackType} from '../types/Types';
import LinearGradient from 'react-native-linear-gradient';
import {State, useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Lottie from 'lottie-react-native';

// Components
import TextElement from './resuable/TextElement';

interface ModalPlayerType {
  closeModal(): void;
  onTrackNavigate(action: string, value?: number): void;
}

const ModalPlayer: React.FC<ModalPlayerType> = ({
  closeModal,
  onTrackNavigate,
}) => {
  const progress = useProgress();
  const dispatch = useAppDispatch();

  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  )!;
  const playerState = useAppSelector(state => state.deezerSlice.playerState)!;
  const favoritesObj = useAppSelector(state => state.authSlice.favoritesObj);

  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    // @ts-ignore:
    setFavorite(favoritesObj[floatingPlayer.id] ? true : false);
  }, [floatingPlayer]);

  const onPlay = () => onTrackNavigate('play');

  const onPause = () => onTrackNavigate('pause');

  const onNext = () => onTrackNavigate('next');

  const onPrevious = () => onTrackNavigate('previous');

  const onTime = (value: number) => onTrackNavigate('time', value);

  const onVolume = (value: number) =>
    onTrackNavigate('volume', Number(value.toFixed(2)));

  const handleFavorite = async (track: TrackType) => {
    setFavorite(prevState => !prevState);
    dispatch(isFavorite ? deleteFavorite(track.id) : addFavorite(track));
  };

  const debounce = (func: Function) => {
    let timer: any;
    return (args: any) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(args);
      }, 500);
    };
  };

  const optimizeFavoriteFunc = useCallback(debounce(handleFavorite), [
    isFavorite,
    floatingPlayer,
  ]);

  return (
    <ImageBackground
      style={styles.modalContainer}
      source={{uri: floatingPlayer.image}}>
      <LinearGradient
        colors={['#000000b3', '#000000ee', Colors.black]}
        style={styles.bgCard}>
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
          <TouchableOpacity style={styles.share} onPress={closeModal}>
            <Icon name={'minus'} size={28} color={Colors.secondary} />
          </TouchableOpacity>
          {playerState === State.Playing && (
            <Animated.View
              entering={FadeInLeft}
              exiting={FadeOutRight}
              style={styles.lottieContainer}>
              <Lottie
                source={require('../assets/lottie/waves.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
            </Animated.View>
          )}
          <Slider
            onSlidingComplete={onTime}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor={Colors.white}
            maximumTrackTintColor={Colors.light}
            style={{width: 240, height: 40, zIndex: 50}}
          />
          <TextElement fontWeight={'bold'} cStyle={styles.text}>
            {floatingPlayer.title}
          </TextElement>
          <TextElement fontSize={'sm'} cStyle={styles.text}>
            {floatingPlayer.artist}
          </TextElement>
          <Slider
            onSlidingComplete={onVolume}
            value={0.8}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={Colors.white}
            maximumTrackTintColor={Colors.light}
            style={{width: 240, height: 40, zIndex: 50}}
          />
          <TouchableOpacity
            style={styles.liked}
            onPress={optimizeFavoriteFunc.bind(this, floatingPlayer)}>
            <Icon
              name={'heart'}
              size={28}
              color={isFavorite ? Colors.active : Colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerContainer}>
          <TouchableOpacity onPress={onPrevious}>
            <Icon name={'backward'} size={28} color={Colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={playerState === State.Playing ? onPause : onPlay}>
            <Icon
              name={playerState === State.Playing ? 'pause' : 'play'}
              size={28}
              color={Colors.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext}>
            <Icon name={'forward'} size={28} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgCard: {
    width: '100%',
    height: '100%',
  },
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
    right: '5%',
    padding: 16,
  },
  share: {
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    padding: 16,
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
  lottie: {
    width: PropDimensions.fullWidth,
    height: Dimensions.get('window').height * 0.42,
  },
});

export default ModalPlayer;

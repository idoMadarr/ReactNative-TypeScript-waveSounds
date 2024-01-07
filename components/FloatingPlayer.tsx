import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {cleanFloatingPlayer} from '../redux/slices/deezerSlice';
import {PropDimensions} from '../dimensions/dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';

// Components
import TextElement from './resuable/TextElement';

interface FloatingPlayerType {
  playerStatus: boolean;
  setPlayerStatus: Function;
  setTimeLeft: Function;
  openModal(): void;
}

const INIT_PLAYER_POSITION = Dimensions.get('window').height * 0.2;
const BOTTOM_PLAYER_POSITION = Dimensions.get('window').height * 0.09;

const FloatingPlayer: React.FC<FloatingPlayerType> = ({
  playerStatus,
  setPlayerStatus,
  setTimeLeft,
  openModal,
}) => {
  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack);
  const currentAlbum = useAppSelector(state => state.deezerSlice.currentAlbum);
  const currentRecipient = useAppSelector(
    state => state.authSlice.currentRecipient,
  );

  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  )!;
  const floatingPlayerYIndex = useRef(
    new Animated.Value(INIT_PLAYER_POSITION),
  ).current;
  const floatingPlayerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setPlayerStatus(true);
    verticalAnimatedPlayer(true);
  }, []);

  useEffect(() => {
    if (currentAlbum) {
      verticalAnimation(floatingPlayerYIndex, BOTTOM_PLAYER_POSITION);
    } else {
      verticalAnimation(floatingPlayerYIndex, 0);
    }
    if (currentRecipient) {
      verticalAnimation(floatingPlayerOpacity, 0);
    } else {
      verticalAnimation(floatingPlayerOpacity, 1);
    }
  }, [currentAlbum, currentRecipient]);

  const verticalAnimatedPlayer = (status: boolean) => {
    verticalAnimation(floatingPlayerYIndex, status ? 0 : INIT_PLAYER_POSITION);
    verticalAnimation(floatingPlayerOpacity, status ? 1 : 0);
  };

  const verticalAnimation = (ref: any, value: number) => {
    Animated.timing(ref, {
      toValue: value,
      useNativeDriver: true,
      easing: Easing.ease,
      duration: 300,
    }).start();
  };

  const onPause = () => {
    setPlayerStatus(false);
    currentTrack?.pause();
  };

  const onPlay = () => {
    setPlayerStatus(true);
    currentTrack?.play();
  };

  const onClose = () => {
    verticalAnimatedPlayer(false);
    setTimeLeft(0);
    setPlayerStatus(false);
    setTimeout(() => {
      currentTrack?.stop();
      dispatch(cleanFloatingPlayer());
    }, 300);
  };

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        {
          opacity: floatingPlayerOpacity,
          transform: [{translateY: floatingPlayerYIndex}],
        },
      ]}>
      <TouchableOpacity onPress={openModal} style={styles.side}>
        <FastImage
          source={{uri: floatingPlayer.image}}
          resizeMode={'cover'}
          style={styles.image}
        />
        <View style={styles.details}>
          <TextElement
            fontSize={'sm'}
            numberOfLines={1}
            cStyle={{color: Colors.white}}>
            {floatingPlayer.title}
          </TextElement>
          <TextElement
            fontSize={'sm'}
            fontWeight={'bold'}
            cStyle={{color: Colors.white}}>
            {floatingPlayer.artist}
          </TextElement>
        </View>
      </TouchableOpacity>
      <View style={styles.controller}>
        <TouchableOpacity
          onPress={playerStatus ? onPause : onPlay}
          style={styles.icon}>
          <Icon
            name={playerStatus ? 'pause' : 'play'}
            size={28}
            color={Colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.icon}>
          <Icon name={'close'} size={28} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: PropDimensions.tabHight,
    alignSelf: 'center',
    width: PropDimensions.fullWidth,
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    backgroundColor: '#040404bd',
    bottom: PropDimensions.tabHight,
    left: 0,
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '75%',
    overflow: 'hidden',
  },
  controller: {
    height: '100%',
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    width: '80%',
    marginHorizontal: '4%',
    alignItems: 'flex-start',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 6,
  },
  icon: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingPlayer;

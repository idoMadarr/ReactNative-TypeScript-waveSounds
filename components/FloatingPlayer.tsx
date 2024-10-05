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
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {State} from 'react-native-track-player';
import {PropDimensions} from '../dimensions/dimensions';
import {cleanFloatingPlayer} from '../redux/slices/deezerSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';

// Components
import TextElement from './resuable/TextElement';

interface FloatingPlayerType {
  openModal(): void;
  trackController(action: string): void;
}

const INIT_PLAYER_POSITION = Dimensions.get('window').height * 0.2;
const BOTTOM_PLAYER_POSITION = Dimensions.get('window').height * 0.09;

const FloatingPlayer: React.FC<FloatingPlayerType> = ({
  openModal,
  trackController,
}) => {
  const dispatch = useAppDispatch();

  const currentAlbum = useAppSelector(state => state.deezerSlice.currentAlbum);
  const playerState = useAppSelector(state => state.deezerSlice.playerState);
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

  const onPause = async () => trackController('pause');

  const onPlay = () => trackController('play');

  const onNext = () => trackController('next');

  const onClose = () => {
    verticalAnimatedPlayer(false);
    trackController('stop');
    setTimeout(() => {
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
          onPress={playerState === State.Playing ? onPause : onPlay}
          style={styles.icon}>
          <Icon
            name={playerState === State.Playing ? 'pause' : 'play'}
            size={28}
            color={Colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} style={styles.icon}>
          <Icon name={'forward'} size={28} color={Colors.secondary} />
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
    paddingHorizontal: '2%',
    backgroundColor: '#040404bd',
    bottom: PropDimensions.tabHight,
    left: 0,
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '65%',
    overflow: 'hidden',
  },
  controller: {
    height: '100%',
    width: '35%',
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
    width: '33.3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingPlayer;

import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {useAppSelector} from '../redux/hooks';
import {PropDimensions} from '../dimensions/dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';

// Components
import TextElement from './resuable/TextElement';

const MiniPlayer = () => {
  const [status, setStatus] = useState(true);
  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack);
  const track = useAppSelector(
    state => state.deezerSlice.miniPlayer.track,
  ) as any;

  const onPause = () => {
    setStatus(false);
    currentTrack?.pause();
  };

  const onPlay = () => {
    setStatus(true);
    currentTrack?.play();
  };

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      style={styles.miniContainer}>
      <View style={styles.left}>
        <Image
          source={{uri: track.album.cover_small}}
          resizeMode={'cover'}
          style={{width: 35, height: 35}}
        />
        <View style={styles.details}>
          <TextElement cStyle={{color: Colors.white}}>
            {track.title}
          </TextElement>
          <TextElement fontSize={'sm'} cStyle={{color: Colors.white}}>
            {track.artist.name}
          </TextElement>
        </View>
      </View>
      <View style={styles.right}>
        <Icon
          name={'heart-o'}
          size={28}
          color={Colors.secondary}
          style={styles.details}
        />
        {status ? (
          <TouchableOpacity onPress={onPause}>
            <Icon name={'pause'} size={28} color={Colors.secondary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPlay}>
            <Icon name={'play'} size={28} color={Colors.secondary} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  miniContainer: {
    height: 50,
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 4,
    opacity: 0.95,
    width: PropDimensions.fullWidth,
    backgroundColor: Colors.greyish,
    position: 'absolute',
    bottom: 50,
    zIndex: 350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  details: {
    marginHorizontal: 16,
  },
});

export default MiniPlayer;

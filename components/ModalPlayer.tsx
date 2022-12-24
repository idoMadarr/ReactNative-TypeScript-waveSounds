import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';
import {PropDimensions} from '../dimensions/dimensions';

// Components
import TextElement from './resuable/TextElement';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const END_REACH = 250;

interface ModalPlayerType {
  closeModal(): void;
}

const ModalPlayer: React.FC<ModalPlayerType> = ({closeModal}) => {
  const [status, setStatus] = useState(true);
  const offset = useSharedValue(0);
  const start = useSharedValue(0);
  const isTocuhed = useSharedValue(false);

  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack);
  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  )!;

  //   @ts-ignore:
  //   currentTrack?.getCurrentTime(seconds => console.log('at ' + seconds));
  console.log(currentTrack._duration);

  const onPlay = () => {
    setStatus(true);
    currentTrack?.play();
  };

  const onPause = () => {
    setStatus(false);
    currentTrack?.pause();
  };

  const onForward = () => {
    console.log('next');
  };

  const onGestureDrop = () => {
    console.log('done');
  };

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      isTocuhed.value = true;
    })
    .onUpdate(event => {
      if (event.translationX > END_REACH) {
        offset.value = 250;
      } else if (event.translationX < 0) {
        offset.value = 0;
      } else {
        offset.value = event.translationX + start.value;
      }
    })
    .onEnd(e => {
      isTocuhed.value = false;
      onGestureDrop();
      offset.value = withTiming(0);
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
      backgroundColor: isTocuhed.value ? Colors.active : Colors.white,
    };
  });

  return (
    <View style={styles.modalContainer}>
      <View style={styles.imageContainer}>
        <Image source={{uri: floatingPlayer.image}} style={styles.image} />
      </View>
      <View>
        <TextElement fontWeight={'bold'} cStyle={styles.text}>
          {floatingPlayer.title}
        </TextElement>
        <TextElement fontSize={'sm'} cStyle={styles.text}>
          {floatingPlayer.artist}
        </TextElement>
      </View>
      <View style={styles.progressLine}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.progressDot, animatedStyles]} />
        </GestureDetector>
      </View>
      <View style={styles.controllerContainer}>
        <TouchableOpacity>
          <Icon name={'backward'} size={28} color={Colors.secondary} />
        </TouchableOpacity>
        {status ? (
          <TouchableOpacity onPress={onPause}>
            <Icon name={'pause'} size={28} color={Colors.secondary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPlay}>
            <Icon name={'play'} size={28} color={Colors.active} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onForward}>
          <Icon name={'forward'} size={28} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: PropDimensions.maxModalHeight,
    paddingVertical: '10%',
  },
  imageContainer: {
    width: 280,
    height: 280,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  text: {
    width: 280,
    color: Colors.white,
    textAlign: 'center',
  },
  controllerContainer: {
    width: 300,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  progressLine: {
    height: 1,
    width: 300,
    backgroundColor: Colors.white,
  },
  progressDot: {
    position: 'absolute',
    top: -10,
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  active: {
    color: Colors.active,
  },
});

export default ModalPlayer;

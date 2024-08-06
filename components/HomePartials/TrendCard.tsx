import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
import PlayIcon from '../../assets/vectors/play.svg';

// Components
import TextElement from '../resuable/TextElement';

const SIZE = Dimensions.get('window').width * 0.7;

interface TrendCardType {
  artist: string;
  title: string;
  image: string;
  index: number;
  onPlay(): void;
  translateX: Animated.SharedValue<number>;
}

const TrendCard: React.FC<TrendCardType> = ({
  artist,
  title,
  image,
  index,
  onPlay,
  translateX,
}) => {
  const {width} = useWindowDimensions();
  const inputRage = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRage,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRage,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      translateX.value,
      inputRage,
      [width, 0, -width],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRage,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{translateX: translate}],
    };
  });

  return (
    <View
      style={[
        styles.item,
        {backgroundColor: index % 2 === 0 ? Colors.primary : Colors.dark},
      ]}>
      <Animated.View style={[styles.card, rStyle]}>
        <ImageBackground
          resizeMode={'contain'}
          style={styles.flex}
          source={{uri: image}}></ImageBackground>
      </Animated.View>
      <Animated.View style={[styles.header, rTextStyle]}>
        <TextElement
          numberOfLines={2}
          fontSize={'xl'}
          fontWeight={'bold'}
          cStyle={styles.center}>
          {title}
        </TextElement>
        <TextElement fontWeight={'bold'} cStyle={{color: Colors.greyish}}>
          {`* ${artist} *`}
        </TextElement>
        <TouchableOpacity
          onPress={onPlay}
          style={[
            styles.playButton,
            {
              backgroundColor: index % 2 !== 0 ? Colors.primary : Colors.dark,
            },
          ]}>
          <PlayIcon />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: PropDimensions.fullWidth,
    height: PropDimensions.trendsHeight,
  },
  card: {
    width: SIZE,
    height: SIZE,
    borderRadius: 250,
    overflow: 'hidden',
    marginBottom: '25%',
  },
  header: {
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
  },
  playButton: {
    alignSelf: 'center',
    marginHorizontal: 24,
    width: 90,
    height: 90,
    borderRadius: 50,
    marginVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
  },
});

export default TrendCard;

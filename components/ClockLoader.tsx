import {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Colors from '../assets/design/palette.json';

const N = 12;
const SQUARE_SIZE = 8;

interface DigitType {
  index: number;
  progress: Animated.SharedValue<number>;
}

interface ClockLoaderType {
  progress: Animated.SharedValue<number>;
}

const Digit: React.FC<DigitType> = ({index, progress}) => {
  const offest = (2 * Math.PI) / N;
  const finalAngle = offest * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }

    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }

    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE);
    }

    return withTiming(-index * SQUARE_SIZE);
  });

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${rotate.value}rad`},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        rStyles,
        {
          opacity: (index + 1) / N,
        },
      ]}
    />
  );
};

const ClockLoader: React.FC<ClockLoaderType> = ({progress}) => {
  return (
    <Fragment>
      {new Array(12).fill(0).map((_, index) => (
        <Digit key={index} index={index} progress={progress} />
      ))}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    aspectRatio: 1,
    height: SQUARE_SIZE,
    backgroundColor: Colors.secondary,
  },
});

export default ClockLoader;

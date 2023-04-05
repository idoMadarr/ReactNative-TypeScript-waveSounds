import React from 'react';
import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useAppSelector} from '../redux/hooks';
import TrendsList from '../components/TrendsList';
import SectionList from '../components/SectionList';
import {PropDimensions} from '../dimensions/dimensions';
import Colors from '../assets/design/palette.json';

// Components
import StatusBarElement from '../components/resuable/StatusBarElement';

const HomeScreen = () => {
  const trends = useAppSelector(state => state.deezerSlice.trends!);
  const translateX = useSharedValue(0);
  const isFocused = useIsFocused();

  // Creating an 'array mock length' cuase We cant interpolate directly from redux state
  const InterpolationMock = trends.map(() => ({}));

  const onHorizontalScroll = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      InterpolationMock.map((_, i) => PropDimensions.fullWidth * i),
      InterpolationMock.map((_, i) =>
        i % 2 === 0 ? Colors.secondary : Colors.primary,
      ),
    ) as string;
    return {backgroundColor};
  });

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToOffsets={[0, PropDimensions.trendsHeight]}
        contentContainerStyle={{alignItems: 'center'}}
        snapToEnd={false}
        decelerationRate={'fast'}>
        <Animated.View style={[style, styles.trendsContainer]}>
          <Animated.ScrollView
            horizontal
            onScroll={onHorizontalScroll}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={styles.center}
            snapToInterval={PropDimensions.fullWidth}
            decelerationRate={'fast'}>
            {isFocused && <TrendsList trends={trends} />}
          </Animated.ScrollView>
        </Animated.View>
        <SectionList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
  },
  trendsContainer: {
    height: PropDimensions.trendsHeight,
  },
});

export default HomeScreen;

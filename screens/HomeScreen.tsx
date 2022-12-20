import React from 'react';
import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';
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
  const tracks = useAppSelector(state => state.deezerSlice.tracks!);
  const translateX = useSharedValue(0);

  const onHorizontalScroll = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      tracks.map((_, i) => PropDimensions.fullWidth * i),
      tracks.map((_, i) => (i % 2 === 0 ? Colors.secondary : Colors.primary)),
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
            <TrendsList tracks={tracks} />
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

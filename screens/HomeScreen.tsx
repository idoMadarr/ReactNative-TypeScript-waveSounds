import React, {useContext, useEffect} from 'react';
import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {SocketContext} from '../utils/socketIO';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {
  setUpdate,
  updateChainChat,
  updateDrawerStatus,
  updateOnline,
} from '../redux/slices/authSlice';
import TrendsList from '../components/HomePartials/TrendsList';
import SectionList from '../components/HomePartials/SectionList';
import {PropDimensions} from '../dimensions/dimensions';
import {onLogout} from '../utils/onLogout';
import Colors from '../assets/design/palette.json';
import {ConnectedOnlineType, ChatMessageType} from '../types/Types';

// Components
import StatusBarElement from '../components/resuable/StatusBarElement';

const HomeScreen = () => {
  const trends = useAppSelector(state => state.deezerSlice.trends!);

  const translateX = useSharedValue(0);
  const isFocused = useIsFocused();
  const drawerStatus = useDrawerStatus();
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext) as any;

  useEffect(() => {
    dispatch(updateDrawerStatus(drawerStatus));
  }, [drawerStatus]);

  useEffect(() => {
    socket.on('logout', async () => {
      onLogout();
    });

    socket.on('message', (data: ChatMessageType) => {
      dispatch(updateChainChat(data));
      dispatch(setUpdate(true));
    });

    socket.on('update-onlines', async (data: ConnectedOnlineType) => {
      dispatch(updateOnline(data));
    });

    return () => socket.disconnect();
  }, []);

  // Creating an 'array mock length' cuase we cant interpolate directly from redux state
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

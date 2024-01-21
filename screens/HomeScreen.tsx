import React, {useContext, useEffect} from 'react';
import {ScrollView, StyleSheet, SafeAreaView, Alert, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
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
import TextElement from '../components/resuable/TextElement';
import {askPermissions} from '../utils/permissions';

const HomeScreen = () => {
  const trends = useAppSelector(state => state.deezerSlice.trends!);

  const translateX = useSharedValue(0);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext) as any;

  useEffect(() => {
    askPermissions();
  }, []);

  useEffect(() => {
    socket.on('logout', async () => {
      onLogout();
    });

    socket.on('message', async (data: ChatMessageType) => {
      await dispatch(updateChainChat(data));
      dispatch(setUpdate(true));
    });

    socket.on(
      'update-onlines',
      async (data: {type: string; user: ConnectedOnlineType}) => {
        dispatch(updateOnline(data));
      },
    );
  }, []);

  // Listening to Firebase Foreground Notifications
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('foreground message', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
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
        i % 2 === 0 ? Colors.dark : Colors.primary,
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
        contentContainerStyle={styles.center}
        snapToEnd={false}
        decelerationRate={'fast'}>
        <Animated.View style={[style, styles.trendsContainer]}>
          <View style={styles.recommendedContainer}>
            <TextElement fontSize={'lg'}>Recommended for you</TextElement>
          </View>
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
          {/* <View style={styles.trackerContainer}>
            {trends.map(item => (
              <View
                key={item.id}
                style={[styles.tracker, {backgroundColor: Colors.placeholder}]}
              />
            ))}
          </View> */}
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
    paddingTop: '15%',
    height: PropDimensions.trendsHeight,
  },
  recommendedContainer: {
    position: 'absolute',
    top: '6%',
    width: PropDimensions.inputWidth,
    alignSelf: 'center',
  },
  trackerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '4%',
  },
  tracker: {
    width: 14,
    height: 14,
    borderRadius: 50,
    marginHorizontal: 6,
  },
});

export default HomeScreen;

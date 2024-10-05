import React, {Fragment, useContext, useEffect} from 'react';
import {ScrollView, StyleSheet, SafeAreaView, Alert, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {SocketContext} from '../utils/socketIO';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {
  setUpdate,
  updateChainChat,
  updateOnline,
} from '../redux/slices/authSlice';
import SectionList from '../components/HomePartials/SectionList';
import {PropDimensions} from '../dimensions/dimensions';
import {onLogout} from '../utils/onLogout';
import Colors from '../assets/design/palette.json';
import {
  ConnectedOnlineType,
  ChatMessageType,
  PlayerContext,
} from '../types/Types';
import {askPermissions} from '../utils/permissions';
import useTrackPlayer, {initContextTrack} from '../utils/useTrackPlayer';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';

// Components
import StatusBarElement from '../components/resuable/StatusBarElement';
import TextElement from '../components/resuable/TextElement';
import TrendCard from '../components/HomePartials/TrendCard';

const HomeScreen = () => {
  const trends = useAppSelector(state => state.deezerSlice.trends!);
  useTrackPlayer();

  const translateX = useSharedValue(0);
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

  const onHorizontalScroll = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const onPlay = (
    id: string,
    image: string,
    title: string,
    artist: string,
    url: string,
  ) => {
    const createFloatingTrack = new FloatingPlayerInstance(
      id,
      title,
      artist,
      image,
      url,
    );

    initContextTrack(PlayerContext.TRENDS, trends, createFloatingTrack);
  };

  return (
    <Fragment>
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
          <View style={styles.trendsContainer}>
            <View style={styles.recommendedContainer}>
              <TextElement fontSize={'lg'} fontWeight={'bold'}>
                Top Hits
              </TextElement>
              <TextElement cStyle={{color: Colors.greyish}}>
                Stay updated with fresh music and explore new releases, rising
                hits, and popular tracks that are making waves globally.
              </TextElement>
            </View>
            <Animated.ScrollView
              horizontal
              onScroll={onHorizontalScroll}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              contentContainerStyle={styles.center}
              snapToInterval={PropDimensions.fullWidth}
              decelerationRate={'fast'}>
              {trends.map(({id, artist, title, image, url}, index) => (
                <TrendCard
                  key={id}
                  artist={artist}
                  title={title}
                  image={image}
                  index={index}
                  translateX={translateX}
                  onPlay={onPlay.bind(
                    this,
                    id.toString(),
                    image,
                    title,
                    artist,
                    url!,
                  )}
                />
              ))}
            </Animated.ScrollView>
          </View>
          <SectionList />
        </ScrollView>
      </SafeAreaView>
    </Fragment>
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
  recommendedContainer: {
    position: 'absolute',
    top: '5%',
    zIndex: 2000,
    left: '5%',
    width: PropDimensions.inputWidth,
    alignSelf: 'center',
  },
});

export default HomeScreen;

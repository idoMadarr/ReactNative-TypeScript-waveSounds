import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setFloatingPlayer} from '../redux/slices/deezerSlice';
import {AuthStack, MainStack} from './StackNavigation';
import {Modalize} from 'react-native-modalize';
import {PropDimensions} from '../dimensions/dimensions';
import TrackPlayer from 'react-native-track-player';
import {navigationRef} from '../utils/rootNavigation';

// Screens
import DrawerNavigation from './DrawerNavigation';
import LoadingScreen from '../screens/LoadingScreen';
import FloatingPlayer from '../components/FloatingPlayer';
import ModalElement from '../components/resuable/ModalElement';
import ModalPlayer from '../components/ModalPlayer';
import OverlaySpinner from '../components/OverlaySpinner';
import ModalMessage from '../components/ModalMessage/ModalMessage';

const AppNavigation: React.FC = () => {
  const AppNavigator = createNativeStackNavigator();
  const dispatch = useAppDispatch();

  const modalizePlayerRef = useRef<Modalize>();
  const modalizeMessageRef = useRef<Modalize>();

  const loading = useAppSelector(state => state.authSlice.loading);
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  const modalMessage = useAppSelector(state => state.authSlice.modalMessage);
  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  );

  useEffect(() => {
    if (modalMessage) {
      openMessageModal();
    }
  }, [modalMessage]);

  const onTrackNavigate = async (action: string, value?: number) => {
    if (action === 'time') {
      return await TrackPlayer.seekTo(value!);
    }

    if (action === 'volume') {
      return await TrackPlayer.setVolume(value!);
    }

    if (action === 'play') {
      return await TrackPlayer.play();
    }

    if (action === 'pause') {
      return await TrackPlayer.pause();
    }

    if (action === 'stop') {
      return await TrackPlayer.stop();
    }

    const queue = await TrackPlayer.getQueue();
    const currentIndexTrack = await TrackPlayer.getActiveTrackIndex();

    if (action === 'next') {
      const nextIndexTrack = currentIndexTrack! + 1;

      if (queue.length > nextIndexTrack) {
        await TrackPlayer.skipToNext();
        return dispatch(setFloatingPlayer(queue[nextIndexTrack]));
      }
      TrackPlayer.skip(0);
    }

    if (action === 'previous') {
      const backIndexTrack = currentIndexTrack! - 1;

      if (backIndexTrack > 0) {
        await TrackPlayer.skipToPrevious();
        return dispatch(setFloatingPlayer(queue[backIndexTrack]));
      }
      TrackPlayer.skip(queue.length - 1);
    }
  };

  const openModal = () => modalizePlayerRef.current?.open();

  const closeModal = () => modalizePlayerRef.current?.close();

  const openMessageModal = () => modalizeMessageRef.current?.open();

  const closeMessageModal = () => modalizeMessageRef.current?.close();

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator.Navigator screenOptions={{headerShown: false}}>
        <AppNavigator.Screen name={'loading'} component={LoadingScreen} />
        {isAuth ? (
          <AppNavigator.Group>
            <AppNavigator.Screen name={'app'} component={DrawerNavigation} />
            <AppNavigator.Screen name={'main'} component={MainStack} />
          </AppNavigator.Group>
        ) : (
          <AppNavigator.Group>
            <AppNavigator.Screen name={'auth'} component={AuthStack} />
          </AppNavigator.Group>
        )}
      </AppNavigator.Navigator>
      {loading && <OverlaySpinner />}
      {floatingPlayer && (
        <FloatingPlayer
          openModal={openModal}
          onTrackNavigate={onTrackNavigate}
        />
      )}
      <ModalElement
        modalizeRef={modalizePlayerRef}
        modalHeight={PropDimensions.maxModalHeight}>
        <ModalPlayer
          onTrackNavigate={onTrackNavigate}
          closeModal={closeModal}
        />
      </ModalElement>
      <ModalElement
        modalizeRef={modalizeMessageRef}
        modalHeight={PropDimensions.messageModalHeight}>
        <ModalMessage
          closeMessageModal={closeMessageModal}
          modalMessage={modalMessage}
        />
      </ModalElement>
    </NavigationContainer>
  );
};

export default AppNavigation;

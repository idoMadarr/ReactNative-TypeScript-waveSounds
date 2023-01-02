import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '../redux/hooks';
import {Modalize} from 'react-native-modalize';
import soundTracker from '../utils/soundTracker';

// Screens
import {AuthStack} from './StackNavigation';
import DrawerNavigation from './DrawerNavigation';
import LoadingScreen from '../screens/LoadingScreen';
import FloatingPlayer from '../components/FloatingPlayer';
import ModalElement from '../components/resuable/ModalElement';
import ModalPlayer from '../components/ModalPlayer';
import OverlaySpinner from '../components/OverlaySpinner';

const AppNavigation: React.FC = () => {
  const [playerStatus, setPlayerStatus] = useState(false);
  const AppNavigator = createNativeStackNavigator();

  const modalizeRef = useRef<Modalize>();
  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack);
  const loading = useAppSelector(state => state.authSlice.loading);
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  );

  useEffect(() => {
    if (currentTrack) {
      soundTracker(currentTrack);
    }
  }, [currentTrack]);

  const openModal = () => modalizeRef.current?.open();

  const closeModal = () => modalizeRef.current?.close();

  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{headerShown: false}}>
        <AppNavigator.Screen name={'loading'} component={LoadingScreen} />
        {isAuth ? (
          <AppNavigator.Group>
            <AppNavigator.Screen name={'app'} component={DrawerNavigation} />
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
          playerStatus={playerStatus}
          setPlayerStatus={setPlayerStatus}
          openModal={openModal}
        />
      )}
      <ModalElement modalizeRef={modalizeRef}>
        <ModalPlayer
          playerStatus={playerStatus}
          setPlayerStatus={setPlayerStatus}
          closeModal={closeModal}
        />
      </ModalElement>
    </NavigationContainer>
  );
};

export default AppNavigation;

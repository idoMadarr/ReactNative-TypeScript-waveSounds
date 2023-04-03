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

const END_REACH = 240;

const AppNavigation: React.FC = () => {
  const [playerStatus, setPlayerStatus] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
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

  useEffect(() => {
    const clacTime = () => {
      if (timeLeft >= END_REACH || !playerStatus) {
        return clearInterval(timer);
      }
      setTimeLeft(prevState => prevState + 1);
    };

    const timer = setInterval(clacTime, 1000);

    return () => clearInterval(timer);
  }, [playerStatus]);

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
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          closeModal={closeModal}
        />
      </ModalElement>
    </NavigationContainer>
  );
};

export default AppNavigation;

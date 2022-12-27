import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '../redux/hooks';
import {Modalize} from 'react-native-modalize';
import soundTracker from '../utils/soundTracker';

// Screens
import TabNavigation from './TabNavigation';
import LoadingScreen from '../screens/LoadingScreen';
import FloatingPlayer from '../components/FloatingPlayer';
import ModalElement from '../components/resuable/ModalElement';
import ModalPlayer from '../components/ModalPlayer';

const AppNavigation: React.FC = () => {
  const [playerStatus, setPlayerStatus] = useState(false);
  const AppNavigator = createNativeStackNavigator();

  const modalizeRef = useRef<Modalize>();
  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack);
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
        <AppNavigator.Screen name={'init'} component={LoadingScreen} />
        <AppNavigator.Group>
          <AppNavigator.Screen name={'tabs'} component={TabNavigation} />
        </AppNavigator.Group>
      </AppNavigator.Navigator>
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

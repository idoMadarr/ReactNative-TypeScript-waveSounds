import React, {useEffect, useRef} from 'react';
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
  const AppNavigator = createNativeStackNavigator();

  const modalizeRef = useRef<Modalize>();
  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack);
  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  );

  useEffect(() => {
    soundTracker(currentTrack);
  }, [currentTrack]);

  const openModal = () => modalizeRef.current?.open();

  const closeModal = () => modalizeRef.current?.close();

  let setFloatingPlayer = null;
  if (floatingPlayer) {
    setFloatingPlayer = <FloatingPlayer openModal={openModal} />;
  }

  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{headerShown: false}}>
        <AppNavigator.Screen name={'init'} component={LoadingScreen} />
        <AppNavigator.Group>
          <AppNavigator.Screen name={'tabs'} component={TabNavigation} />
        </AppNavigator.Group>
      </AppNavigator.Navigator>
      {setFloatingPlayer}
      <ModalElement modalizeRef={modalizeRef}>
        <ModalPlayer closeModal={closeModal} />
      </ModalElement>
    </NavigationContainer>
  );
};

export default AppNavigation;

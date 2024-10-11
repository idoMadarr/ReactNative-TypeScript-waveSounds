import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '../redux/hooks';
import {AuthStack, MainStack} from './StackNavigation';
import {Modalize} from 'react-native-modalize';
import {PropDimensions} from '../dimensions/dimensions';
import {navigationRef} from '../utils/rootNavigation';

// Screens
import DrawerNavigation from './DrawerNavigation';
import LoadingScreen from '../screens/LoadingScreen';
import FloatingPlayer from '../components/FloatingPlayer';
import ModalElement from '../components/resuable/ModalElement';
import ModalPlayer from '../components/ModalPlayer';
import OverlaySpinner from '../components/OverlaySpinner';
import ModalMessage from '../components/ModalMessage/ModalMessage';
import {trackController} from '../utils/useTrackPlayer';

const AppNavigation: React.FC = () => {
  const AppNavigator = createNativeStackNavigator();

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
          trackController={trackController}
        />
      )}
      <ModalElement
        modalizeRef={modalizePlayerRef}
        modalHeight={PropDimensions.maxModalHeight}>
        <ModalPlayer
          trackController={trackController}
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

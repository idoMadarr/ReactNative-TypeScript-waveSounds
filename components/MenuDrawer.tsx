import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import LinearGradient from 'react-native-linear-gradient';
import {resetDezeerSlice} from '../redux/slices/deezerSlice';
import {resetAuthSlice} from '../redux/slices/authSlice';
import {clearStorage} from '../utils/asyncStorage';
import {oauthSignout} from '../utils/OAuth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';

// Components
import TextElement from './resuable/TextElement';
import ButtonElement from './resuable/ButtonElement';

const MenuDrawer = () => {
  const user = useAppSelector(state => state.authSlice.user)!;
  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack)!;
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    oauthSignout();
    currentTrack?.stop();
    dispatch(resetAuthSlice());
    dispatch(resetDezeerSlice());
    clearStorage();
  };

  return (
    <LinearGradient
      colors={[
        Colors.primary,
        Colors['gradient--modal-start'],
        Colors['gradient-modal-end'],
      ]}
      style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Icon
          name={'user-circle-o'}
          size={68}
          color={Colors.active}
          style={{marginBottom: 8}}
        />
        <TextElement fontWeight={'bold'} cStyle={styles.headers}>
          {user.username}
        </TextElement>
        <View
          style={{
            margin: 16,
          }}>
          <View
            style={{
              borderLeftWidth: 1,
              borderColor: Colors.active,
              padding: 20,
            }}>
            <TextElement>
              WaveSounds is a Fullstack digital music application that gives you
              access to millions of songs and other content from creators all
              over the world. This project is built from the ground up by Ido
              Adar, and made for representation only service.
            </TextElement>
          </View>
          <View
            style={{
              borderRightWidth: 1,
              borderColor: Colors.active,
              padding: 20,
            }}>
            <TextElement>
              This project was built from the ground up with TypeScript on all
              levels. NodeJS as a backend, combined with MongoDB for storing
              user's data & React Native (CLI) for building beautiful & complex
              user interfaces - including Full Authentication Process, Social
              login, Complex Navigation , Reanimated animations and
              interactions, Gestures handlers, Colors interpolation, and much
              more.
            </TextElement>
          </View>
        </View>
      </View>
      <ButtonElement
        title={'Logout'}
        backgroundColor={Colors.primary}
        titleColor={Colors.placeholder}
        customStyle={styles.logout}
        onPress={onLogout}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  drawerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headers: {
    color: Colors.white,
    textAlign: 'center',
  },
  logout: {
    borderWidth: 1,
    borderColor: Colors.placeholder,
  },
});

export default MenuDrawer;

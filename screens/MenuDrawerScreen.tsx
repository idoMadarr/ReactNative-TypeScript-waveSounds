import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/design/palette.json';
import {onLogout} from '../utils/onLogout';
import {PropDimensions} from '../dimensions/dimensions';

// Components
import OnlineList from '../components/MenuPartials/OnlineList';
import TextElement from '../components/resuable/TextElement';
import ButtonElement from '../components/resuable/ButtonElement';

const MenuDrawerScreen = () => {
  const user = useAppSelector(state => state.authSlice.user);

  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        colors={[
          Colors.primary,
          Colors['gradient--modal-start'],
          Colors['gradient-modal-end'],
        ]}>
        <View style={styles.drawerWrapper}>
          <View style={styles.drawerHeader}>
            <TextElement fontWeight={'bold'} cStyle={{color: Colors.active}}>
              {`Hi ${user.username}`}
            </TextElement>
            <TextElement>
              WaveSounds is a Fullstack digital music application that gives you
              access to millions of songs and other content from creators all
              over the world. This project is built from the ground up by Ido
              Adar, and made for representation only service.
            </TextElement>
            <TextElement>
              This project was built from the ground up with TypeScript on all
              levels. NodeJS as a backend, combined with MongoDB for storing
              user's data & React Native (CLI) for building beautiful & complex
              user interfaces - including Full Authentication Process, Social
              login, Complex Navigation , Reanimated animations and
              interactions, Gestures handlers, Colors interpolation, and much
              more.
            </TextElement>
            <OnlineList />
          </View>
          <ButtonElement
            title={'Logout'}
            backgroundColor={Colors.primary}
            titleColor={Colors.placeholder}
            customStyle={styles.logout}
            onPress={onLogout}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  drawerWrapper: {
    height: '100%',
    width: PropDimensions.favoriteHeaderWidth,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  drawerHeader: {
    width: '100%',
    height: '70%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  logout: {
    borderWidth: 1,
    borderColor: Colors.placeholder,
  },
});

export default MenuDrawerScreen;

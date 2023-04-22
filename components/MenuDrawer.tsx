import React from 'react';
import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';
import {onLogout} from '../utils/onLogout';
import {ConnectedOnlineType} from '../types/Types';

// Components
import TextElement from './resuable/TextElement';
import ButtonElement from './resuable/ButtonElement';
import {PropDimensions} from '../dimensions/dimensions';

const MenuDrawer = () => {
  const user = useAppSelector(state => state.authSlice.user)!;
  const onlines = useAppSelector(state => state.authSlice.onlines);

  const navigation = useNavigation();

  const list: ConnectedOnlineType[] = [];
  for (const online in onlines) {
    list.push({...onlines[online], socketAddress: online});
  }

  const chatNavigate = (user: ConnectedOnlineType) =>
    // @ts-ignore:
    navigation.navigate('chat', {user});

  let displayActiveUsers = null;
  if (list.length > 0) {
    displayActiveUsers = (
      <View style={styles.onlineList}>
        <TextElement>{`${list.length} Onlines user:`}</TextElement>
        {list.map(user => (
          <TouchableOpacity
            key={user.userId}
            onPress={chatNavigate.bind(this, user)}
            style={[styles.container]}>
            <View style={styles.left}>
              <TextElement>{user.username}</TextElement>
              <TextElement
                fontSize={'sm'}
                fontWeight={'bold'}
                cStyle={{color: Colors.active}}>
                Active now!
              </TextElement>
            </View>
            <View style={styles.right}>
              <Icon name={'comments'} size={22} color={Colors.secondary} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

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
            {displayActiveUsers}
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
    height: '68%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  logout: {
    borderWidth: 1,
    borderColor: Colors.placeholder,
  },
  onlineList: {
    width: PropDimensions.favoriteHeaderWidth,
  },
  container: {
    height: PropDimensions.favoriteHeight,
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: Colors['gradient-start'],
  },
  left: {
    width: '80%',
    justifyContent: 'center',
  },
  right: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default MenuDrawer;

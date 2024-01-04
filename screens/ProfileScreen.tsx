import React from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/design/palette.json';
import {sendPushDetails} from '../redux/actions/authAction';
import {PropDimensions} from '../dimensions/dimensions';
import Lottie from 'lottie-react-native';
import LogoutIcon from '../assets/vectors/logout.svg';
import {setModalMessage} from '../redux/slices/authSlice';

// Components
import TextElement from '../components/resuable/TextElement';
import ButtonElement from '../components/resuable/ButtonElement';
import StatusBarElement from '../components/resuable/StatusBarElement';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.authSlice.user);

  const logoutUser = () => {
    dispatch(
      setModalMessage([
        {message: 'Are you sure you want to exit?', field: 'logout'},
      ]),
    );
  };

  const techList = [
    'Full Authentication Process',
    'Social login with Google API',
    'Push Notification via Firebase',
    'Complex Navigation architecture',
    'Reanimated animations & Gestures handlers',
    'Reanimated animations',
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <LinearGradient
        style={styles.drawerWrapper}
        colors={[Colors.primary, Colors['primary-shadow'], Colors.primary]}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TextElement
              fontSize={'xl'}
              fontWeight={'bold'}
              cStyle={{color: Colors.active}}>
              {`Hi ${user.username.toUpperCase()}`}
            </TextElement>
            <TouchableOpacity
              onPress={logoutUser}
              style={{alignItems: 'center'}}>
              <LogoutIcon style={{color: Colors.white}} />
              <TextElement fontSize={'sm'}>Logout</TextElement>
            </TouchableOpacity>
          </View>
          <TextElement>
            The project was built from the ground up with TypeScript on all
            levels. NodeJS as a backend, combined with Redis and MongoDB for
            storing user's data & React Native (CLI) for building beautiful user
            interface.
          </TextElement>
          <View style={{marginVertical: '2%'}}>
            {techList.map(item => (
              <View key={item} style={styles.listItem}>
                <View style={styles.dot} />
                <TextElement fontSize={'sm'} cStyle={styles.greish}>
                  {item}
                </TextElement>
              </View>
            ))}
          </View>
          <ButtonElement
            title={'Click For Push Details'}
            backgroundColor={Colors.transparent}
            titleColor={Colors.active}
            customStyle={styles.details}
            onPress={sendPushDetails}
          />
        </View>
        <View style={styles.lottieContainer}>
          <Lottie
            source={require('../assets/lottie/player.json')}
            autoPlay
            loop
            style={styles.lottie}
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
    paddingHorizontal: '15%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4%',
  },
  details: {
    borderRadius: 50,
    borderWidth: 0,
    elevation: 0,
  },
  lottieContainer: {
    width: PropDimensions.fullWidth,
    height: '35%',
    overflow: 'hidden',
  },
  greish: {
    color: Colors.greyish,
  },
  lottie: {
    position: 'absolute',
    top: '-50%',
    left: '-150%',
    width: '400%',
    height: '400%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: Colors.active,
    borderRadius: 50,
    marginRight: '2%',
  },
});

export default ProfileScreen;

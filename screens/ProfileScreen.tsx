import React from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/design/palette.json';
import {PropDimensions} from '../dimensions/dimensions';
import Lottie from 'lottie-react-native';
import LogoutIcon from '../assets/vectors/logout.svg';
import {setModalMessage} from '../redux/slices/authSlice';

// Components
import TextElement from '../components/resuable/TextElement';
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
    'Real-Time Music Streaming: Access a vast library of music with high-quality audio streaming',
    'Voice Recognition Search: Use voice commands to search for songs, artists, and playlists easily',
    'Community Chat: Engage with other users in free chat rooms to discuss music and share recommendations',
    'Content Sharing: Share favorite tracks and playlists with friends and the community',
    'Currently in the Beta phase, Wavesounds invites users to explore its features and provide feedback to help shape the final product.',
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
          </View>
          <TextElement>
            Wavesounds is an innovative music streaming app that lets users
            enjoy music and soundtracks in real-time. Designed to elevate the
            listening experience, Wavesounds offers intuitive features for
            discovering, sharing, and enjoying music.
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
          <TouchableOpacity
            onPress={logoutUser}
            style={{
              marginTop: '5%',
              alignItems: 'center',
              backgroundColor: Colors.primary,
              elevation: 3,
              justifyContent: 'center',
              alignSelf: 'center',
              width: PropDimensions.fullWidth / 4,
              height: PropDimensions.fullWidth / 4,
              borderRadius: 150,
            }}>
            <LogoutIcon style={{color: Colors.white}} />
            <TextElement fontSize={'sm'}>Logout</TextElement>
          </TouchableOpacity>
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
    width: PropDimensions.fullWidth,
    paddingHorizontal: '15%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  headerContainer: {
    width: PropDimensions.inputWidth,
    justifyContent: 'space-evenly',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4%',
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

import React, {useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import Colors from '../assets/design/palette.json';
import Lottie from 'lottie-react-native';
import {useAppDispatch} from '../redux/hooks';
import {fetchOnlines} from '../redux/actions/authAction';

// Components
import StatusBarElement from '../components/resuable/StatusBarElement';
import {PropDimensions} from '../dimensions/dimensions';
import OnlineList from '../components/MenuPartials/OnlineList';
import TextElement from '../components/resuable/TextElement';
import {toggleSpinner} from '../redux/slices/authSlice';

const CommunityScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getOnlines();
  }, []);

  const getOnlines = async () => {
    dispatch(toggleSpinner());
    dispatch(fetchOnlines());
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <View style={styles.header}>
        <TextElement fontSize={'xl'} cStyle={styles.active}>
          Onlines
        </TextElement>
        <TextElement>
          Discover a whole new way to connect with your music-loving friends.
          Chat and send music tracks to each other right away. Connect, share,
          and groove together like never before.
        </TextElement>
      </View>
      <OnlineList />
      <Lottie
        source={require('../assets/lottie/chat.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  lottie: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    alignSelf: 'center',
  },
  header: {
    marginTop: '6%',
    alignSelf: 'center',
    width: PropDimensions.inputWidth,
  },
  active: {
    color: Colors.active,
  },
});

export default CommunityScreen;

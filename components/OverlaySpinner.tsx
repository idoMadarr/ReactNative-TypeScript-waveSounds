import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Lottie from 'lottie-react-native';
import Colors from '../assets/design/palette.json';
import {PropDimensions} from '../dimensions/dimensions';

// Components
import TextElement from './resuable/TextElement';

const OverlaySpinner = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <Lottie
          source={require('./../assets/lottie/loader.json')}
          autoPlay
          loop
          style={{width: 150, alignSelf: 'center'}}
        />
        <TextElement cStyle={styles.wait}>Just few moments</TextElement>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: PropDimensions.fullHight,
    width: PropDimensions.fullWidth,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#242424d0',
  },
  wait: {
    textAlign: 'center',
    color: Colors.white,
  },
});

export default OverlaySpinner;

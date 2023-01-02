import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Colors from '../assets/design/palette.json';
import {PropDimensions} from '../dimensions/dimensions';

// Components
import TextElement from './resuable/TextElement';

const OverlaySpinner = () => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.screen}>
      <TextElement fontSize={'lg'} fontWeight={'bold'}>
        Loading...
      </TextElement>
      <ActivityIndicator size={'large'} color={Colors.white} />
    </Animated.View>
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
});

export default OverlaySpinner;

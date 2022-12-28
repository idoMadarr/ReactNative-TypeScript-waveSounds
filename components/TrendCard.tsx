import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {PropDimensions} from '../dimensions/dimensions';
import Colors from '../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from './resuable/TextElement';

interface TrendCardType {
  artist: string;
  title: string;
  rank: number;
  release: string;
  image: string;
  darkMode: boolean;
  onPlay(): void;
}

const TrendCard: React.FC<TrendCardType> = ({
  artist,
  title,
  rank,
  release,
  image,
  darkMode,
  onPlay,
}) => {
  const textColor = darkMode ? Colors.white : Colors.black;
  const cardColor = darkMode ? Colors.greyish : Colors.light;
  const buttonColor = darkMode ? Colors.light : Colors.greyish;
  const buttonTextColor = !darkMode ? Colors.light : Colors.greyish;

  return (
    <View style={styles.item}>
      <Animated.View
        entering={FadeInLeft}
        style={[styles.card, {backgroundColor: cardColor}]}>
        <View style={styles.header}>
          <TextElement
            fontSize={'lg'}
            fontWeight={'bold'}
            cStyle={{color: textColor, ...styles.center}}>
            {title}
          </TextElement>
          <TextElement
            fontWeight={'bold'}
            cStyle={{color: textColor, ...styles.center}}>
            {`* ${artist} *`}
          </TextElement>
        </View>
        <View style={styles.imageContainer}>
          <FastImage
            source={{uri: image}}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
        <Icon name={'star'} size={42} color={buttonColor} style={styles.icon} />
        <TextElement cStyle={{color: textColor}}>{`Rank: ${rank}`}</TextElement>
        <TouchableOpacity
          onPress={onPlay}
          activeOpacity={0.8}
          style={[styles.button, {backgroundColor: buttonColor}]}>
          <TextElement fontWeight={'bold'} cStyle={{color: buttonTextColor}}>
            Play now
          </TextElement>
        </TouchableOpacity>
        <TextElement
          cStyle={{color: textColor}}
          fontSize={'sm'}>{`Realese on ${release}`}</TextElement>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    width: PropDimensions.fullWidth,
  },
  card: {
    width: PropDimensions.cardWidth,
    height: PropDimensions.cardHeight,
    borderRadius: 50,
    borderTopEndRadius: 0,
    borderBottomLeftRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 16,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
  },
  imageContainer: {
    width: '90%',
    height: '50%',
    elevation: 5,
    overflow: 'hidden',
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  icon: {
    position: 'absolute',
    top: '-3%',
    right: '-5%',
  },
});

export default TrendCard;

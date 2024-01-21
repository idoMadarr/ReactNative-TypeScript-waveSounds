import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import Animated, {FadeInDown, FadeOut, Layout} from 'react-native-reanimated';
import {PropDimensions} from '../../dimensions/dimensions';
import {TrackType} from '../../types/Types';
import Colors from '../../assets/design/palette.json';
import MinusIcon from '../../assets/vectors/minus_circle.svg';
import TextElement from '../resuable/TextElement';

interface FavoriteItemPropsType {
  favorite: TrackType;
  index: number;
  indexIndicator: number;
  onSelect(): void;
  onRemove(): void;
}

const FavoriteItem: React.FC<FavoriteItemPropsType> = ({
  favorite,
  index,
  indexIndicator,
  onSelect,
  onRemove,
}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      exiting={FadeOut}
      layout={Layout}
      style={[
        styles.container,
        {
          backgroundColor:
            indexIndicator == index ? Colors.primary : Colors.transparent,
        },
      ]}>
      <TouchableOpacity onPress={onSelect} style={styles.left}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: favorite.image}}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
        <View style={styles.title}>
          <TextElement numberOfLines={1}>{favorite.title}</TextElement>
          <TextElement fontSize={'sm'} cStyle={{color: Colors.placeholder}}>
            {favorite.artist}
          </TextElement>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemove} style={styles.controller}>
        <MinusIcon />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: PropDimensions.favoriteHeight,
    borderBottomWidth: 1,
    borderColor: '#5757573a',
    marginBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '4%',
  },
  left: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 40,
    height: 40,
    marginRight: '5%',
  },
  title: {
    width: '80%',
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  controller: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default FavoriteItem;

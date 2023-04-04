import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import Animated, {FadeInDown, FadeOut, Layout} from 'react-native-reanimated';
import {PropDimensions} from '../../dimensions/dimensions';
import {TrackType} from '../../types/TrackType';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            indexIndicator == index ? Colors.greyish : Colors.transparent,
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
        <View>
          <TextElement>{favorite.title}</TextElement>
          <TextElement fontSize={'sm'} cStyle={{color: Colors.placeholder}}>
            {favorite.artist}
          </TextElement>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemove} style={styles.controller}>
        <Icon name={'minus'} size={12} color={Colors.secondary} />
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
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  left: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 40,
    height: 40,
    marginRight: '8%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  controller: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default FavoriteItem;

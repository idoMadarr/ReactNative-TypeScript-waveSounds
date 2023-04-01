import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeInDown, FadeOut, Layout} from 'react-native-reanimated';
import {PropDimensions} from '../../dimensions/dimensions';
import {TrackType} from '../../types/TrackType';

import TextElement from '../resuable/TextElement';

interface FavoriteItemPropsType {
  favorite: TrackType;
  index: number;
  onRemove(): void;
}

const FavoriteItem: React.FC<FavoriteItemPropsType> = ({
  favorite,
  index,
  onRemove,
}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      exiting={FadeOut}
      layout={Layout}
      onTouchEnd={onRemove}
      style={styles.container}>
      <TextElement>{favorite.title}</TextElement>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PropDimensions.favoriteWidth,
    height: PropDimensions.favoriteHeight,
    backgroundColor: 'red',
    marginVertical: 6,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoriteItem;

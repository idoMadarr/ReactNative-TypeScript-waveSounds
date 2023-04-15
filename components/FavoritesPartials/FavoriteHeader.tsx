import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../../assets/design/palette.json';
import {PropDimensions} from '../../dimensions/dimensions';

// Components
import TextElement from '../resuable/TextElement';

interface FavoriteHeaderPropsType {
  counter: number;
}

const FavoriteHeader: React.FC<FavoriteHeaderPropsType> = ({counter}) => {
  return (
    <View style={styles.headerContainer}>
      <TextElement fontSize={'xl'}>Liked Tracks</TextElement>
      <TextElement
        cStyle={
          styles.songs
        }>{`${counter} Favorites in your list`}</TextElement>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: PropDimensions.favoriteHeaderWidth,
    height: PropDimensions.favoriteHeaderHeight,
    justifyContent: 'center',
  },
  songs: {
    color: Colors.active,
  },
});

export default FavoriteHeader;

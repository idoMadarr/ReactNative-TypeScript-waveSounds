import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../assets/design/palette.json';
import {PropDimensions} from '../../dimensions/dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from '../resuable/TextElement';

interface FavoriteHeaderPropsType {
  floatingPlayer: any;
  onPlay(): void;
  counter: number;
}

const FavoriteHeader: React.FC<FavoriteHeaderPropsType> = ({
  floatingPlayer,
  onPlay,
  counter,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.info}>
        <TextElement fontSize={'xl'}>Liked Tracks</TextElement>
        <TextElement
          cStyle={
            styles.songs
          }>{`${counter} Favorites in your list`}</TextElement>
      </View>
      <TouchableOpacity onPress={onPlay} style={styles.controller}>
        {floatingPlayer ? (
          <Icon name={'pause'} size={34} color={Colors.active} />
        ) : (
          <Icon name={'play'} size={34} color={Colors.secondary} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: PropDimensions.favoriteHeaderWidth,
    height: PropDimensions.favoriteHeaderHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    width: '90%',
  },
  controller: {
    width: '10%',
  },
  songs: {
    color: Colors.active,
  },
});

export default FavoriteHeader;

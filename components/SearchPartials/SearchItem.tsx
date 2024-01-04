import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
import PlayWhiteIcon from '../../assets/vectors/play_white.svg';

// Components
import TextElement from '../resuable/TextElement';

interface SearchItemType {
  title: string;
  artist: string;
  image: string;
  index: number;
  playSoundTrack(): void;
}

const SearchItem: React.FC<SearchItemType> = ({
  title,
  artist,
  image,
  index,
  playSoundTrack,
}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(100 * index)}
      style={styles.searchContainer}>
      <TouchableOpacity onPress={playSoundTrack} style={styles.details}>
        <View style={styles.row}>
          <FastImage source={{uri: image}} style={styles.image} />
          <View style={styles.title}>
            <TextElement numberOfLines={1}>{title}</TextElement>
            <TextElement
              fontSize={'sm'}
              cStyle={styles.artist}
              numberOfLines={1}>
              {artist}
            </TextElement>
          </View>
        </View>
        <PlayWhiteIcon />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: PropDimensions.favoriteHeight,
    borderBottomWidth: 1,
    borderColor: '#5757573a',
    marginBottom: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: '4%',
  },
  details: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artist: {
    color: Colors.placeholder,
  },
  row: {
    width: '90%',
    flexDirection: 'row',
  },
  title: {
    width: '80%',
    alignItems: 'flex-start',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: '5%',
  },
});

export default SearchItem;

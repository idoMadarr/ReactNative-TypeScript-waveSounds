import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      entering={FadeInDown.delay(100 * index).springify()}
      style={styles.searchContainer}>
      <TouchableOpacity onPress={playSoundTrack} style={styles.details}>
        <View style={styles.row}>
          <FastImage source={{uri: image}} style={styles.image} />
          <View>
            <TextElement numberOfLines={2}>{title}</TextElement>
            <TextElement
              fontSize={'sm'}
              cStyle={styles.artist}
              numberOfLines={1}>
              {artist}
            </TextElement>
          </View>
        </View>
        <Icon name={'play'} size={20} color={Colors.white} />
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
    paddingHorizontal: 8,
    borderRadius: 5,
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
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: '8%',
  },
});

export default SearchItem;

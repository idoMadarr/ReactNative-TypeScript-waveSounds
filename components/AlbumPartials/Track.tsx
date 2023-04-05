import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import TextElement from '../resuable/TextElement';
import {useAppSelector} from '../../redux/hooks';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PropDimensions} from '../../dimensions/dimensions';

interface AlbumTrackType {
  id: string;
  title: string;
  initSoundTrack(): void;
  indexIndicator: number;
  onFavorite(): void;
  index: number;
}

const AlbumTrack: React.FC<AlbumTrackType> = ({
  id,
  title,
  initSoundTrack,
  indexIndicator,
  onFavorite,
  index,
}) => {
  // @ts-ignore:
  const isFavorite = useAppSelector(state => state.authSlice.favoritesObj[id]);

  let dynamicColor = Colors.greyish;
  if (isFavorite) {
    dynamicColor = Colors.active;
  }

  if (indexIndicator == index && !isFavorite) {
    dynamicColor = Colors.primary;
  }

  return (
    <TouchableOpacity
      onPress={initSoundTrack}
      style={[
        styles.TrackContainer,
        {
          backgroundColor:
            indexIndicator == index ? Colors.greyish : Colors.transparent,
        },
      ]}>
      <View>
        <TextElement
          numberOfLines={1}
          cStyle={index % 2 === 0 ? styles.active : styles.passive}>
          {title}
        </TextElement>
      </View>
      <TouchableOpacity onPress={onFavorite} style={styles.favorite}>
        <Icon
          name={'star'}
          size={18}
          style={{marginHorizontal: 6}}
          color={dynamicColor}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TrackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#5757573a',
    borderRadius: 5,
  },
  active: {
    maxWidth: PropDimensions.cardWidth,
    color: Colors.active,
  },
  passive: {
    maxWidth: PropDimensions.cardWidth,
    color: Colors.white,
  },
  favorite: {
    paddingHorizontal: 8,
  },
});

export default AlbumTrack;

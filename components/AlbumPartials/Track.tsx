import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import TextElement from '../resuable/TextElement';
import {useAppSelector} from '../../redux/hooks';
import PlayIcon from '../../assets/vectors/play.svg';
import StarIcon from '../../assets/vectors/star.svg';
import Colors from '../../assets/design/palette.json';

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
    dynamicColor = Colors.active;
  }

  return (
    <TouchableOpacity
      onPress={initSoundTrack}
      style={[
        styles.TrackContainer,
        {
          backgroundColor:
            indexIndicator == index ? Colors.selected_dark : Colors.transparent,
        },
      ]}>
      <View style={styles.titleSection}>
        <PlayIcon />
        <TextElement numberOfLines={1} cStyle={styles.title}>
          {title}
        </TextElement>
      </View>
      <TouchableOpacity onPress={onFavorite}>
        <StarIcon color={dynamicColor} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TrackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  titleSection: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    color: Colors.placeholder,
  },
});

export default AlbumTrack;

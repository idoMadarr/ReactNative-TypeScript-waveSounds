import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import TextElement from '../resuable/TextElement';
import {useAppSelector} from '../../redux/hooks';
import StarIcon from '../../assets/vectors/star.svg';
import Colors from '../../assets/design/palette.json';
import {PropDimensions} from '../../dimensions/dimensions';

interface AlbumTrackType {
  id: string;
  title: string;
  onPlay(): void;
  indexIndicator: number;
  onFavorite(): void;
  index: number;
}

const AlbumTrack: React.FC<AlbumTrackType> = ({
  id,
  title,
  onPlay,
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
      onPress={onPlay}
      style={[
        styles.trackContainer,
        {
          backgroundColor:
            indexIndicator == index ? Colors.selected_dark : Colors.transparent,
        },
      ]}>
      <View style={styles.titleSection}>
        <Image
          source={require('../../assets/images/generic_track.png')}
          resizeMode={'cover'}
          style={styles.generalImage}
        />
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
  trackContainer: {
    height: PropDimensions.trackHeight,
    width: PropDimensions.trackWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 1,
  },
  titleSection: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    paddingLeft: 8,
    color: Colors.placeholder,
  },
  generalImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
});

export default AlbumTrack;

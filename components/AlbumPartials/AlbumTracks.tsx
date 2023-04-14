import React from 'react';
import {FlatList, StyleSheet, Dimensions} from 'react-native';
import {TrackType} from '../../types/Types';
import {useAppDispatch} from '../../redux/hooks';
import {addFavorite} from '../../redux/actions/authAction';
import {toggleSpinner} from '../../redux/slices/authSlice';
import Track from './Track';
import {PropDimensions} from '../../dimensions/dimensions';

interface AlbumTrackType {
  tracks: TrackType[];
  onPlay(item: TrackType, index: number): void;
  indexIndicator: number;
}

const AlbumTracks: React.FC<AlbumTrackType> = ({
  tracks,
  onPlay,
  indexIndicator,
}) => {
  const dispatch = useAppDispatch();

  const onStarFavorite = (item: TrackType) => {
    dispatch(toggleSpinner());
    dispatch(addFavorite(item));
  };

  return (
    <FlatList
      data={tracks}
      keyExtractor={({id}) => id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({item, index}) => (
        <Track
          id={item.id.toString()}
          title={item.title}
          onFavorite={onStarFavorite.bind(this, item)}
          index={index}
          initSoundTrack={onPlay.bind(this, item, index)}
          indexIndicator={indexIndicator}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignSelf: 'center',
    width: PropDimensions.favoriteWidth,
    minHeight: Dimensions.get('window').height * 0.65,
  },
});

export default AlbumTracks;

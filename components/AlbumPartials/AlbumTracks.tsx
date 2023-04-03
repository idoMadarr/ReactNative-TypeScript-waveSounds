import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {AlbumTrack} from '../../types/album';
import {useAppDispatch} from '../../redux/hooks';
import {addFavorite} from '../../redux/actions/authAction';
import {toggleSpinner} from '../../redux/slices/authSlice';
import Track from './Track';

interface AlbumTrackType {
  tracks: AlbumTrack[];
  onPlay(item: AlbumTrack, index: number): void;
  indexIndicator: number;
}

const AlbumTracks: React.FC<AlbumTrackType> = ({
  tracks,
  onPlay,
  indexIndicator,
}) => {
  const dispatch = useAppDispatch();

  const onStarFavorite = (item: any) => {
    dispatch(toggleSpinner());
    dispatch(addFavorite(item));
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tracks}
        keyExtractor={({id}) => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Track
            id={item.id.toString()}
            preview={item.preview}
            title={item.title}
            onFavorite={onStarFavorite.bind(this, item)}
            index={index}
            initSoundTrack={onPlay.bind(this, item, index)}
            indexIndicator={indexIndicator}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
});

export default AlbumTracks;

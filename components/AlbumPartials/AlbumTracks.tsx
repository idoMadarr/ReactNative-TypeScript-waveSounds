import React from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {AlbumTrack} from '../../types/album';
import Track from './Track';

interface AlbumTrackType {
  tracks: AlbumTrack[];
  initSoundTrack(item: AlbumTrack, index: number): void;
  indexIndicator: number;
}

const AlbumTracks: React.FC<AlbumTrackType> = ({
  tracks,
  initSoundTrack,
  indexIndicator,
}) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tracks}
        keyExtractor={({id}) => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Track
            preview={item.preview}
            title={item.title}
            index={index}
            initSoundTrack={initSoundTrack.bind(this, item, index)}
            indexIndicator={indexIndicator}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: Dimensions.get('window').height * 0.45,
    marginTop: '5%',
    paddingHorizontal: 16,
  },
});

export default AlbumTracks;

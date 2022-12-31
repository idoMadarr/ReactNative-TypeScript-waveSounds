import React from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {PropDimensions} from '../../dimensions/dimensions';
import {AlbumTrack} from '../../types/album';
import Track from './Track';

interface AlbumTrackType {
  tracks: AlbumTrack[];
  initSoundTrack(url: string, index: number): void;
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
            initSoundTrack={initSoundTrack}
            indexIndicator={indexIndicator}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: '5%',
    paddingHorizontal: 16,
  },
});

export default AlbumTracks;

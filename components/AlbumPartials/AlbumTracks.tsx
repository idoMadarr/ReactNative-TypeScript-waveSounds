import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {AlbumTrack} from '../../types/album';
import Colors from '../../assets/design/palette.json';
import TextElement from '../resuable/TextElement';
import Icon from 'react-native-vector-icons/Entypo';

interface AlbumTrackType {
  tracks: AlbumTrack[];
  initSoundTrack(url: string): void;
}

const AlbumTracks: React.FC<AlbumTrackType> = ({tracks, initSoundTrack}) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tracks}
        keyExtractor={({id}) => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={initSoundTrack.bind(this, item.preview)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: '#5757573a',
              marginBottom: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TextElement
                cStyle={index % 2 === 0 ? styles.active : styles.passive}>
                {item.title}
              </TextElement>
            </View>
            <View>
              <Icon
                name={'dots-three-horizontal'}
                size={18}
                color={Colors.greyish}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  active: {
    color: Colors.active,
  },
  passive: {
    color: Colors.white,
  },
});

export default AlbumTracks;

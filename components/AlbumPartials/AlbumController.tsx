import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextElement from '../resuable/TextElement';

interface AlbumControllerType {
  onPlay(): void;
}

const AlbumController: React.FC<AlbumControllerType> = ({onPlay}) => {
  return (
    <View style={styles.controllerContainer}>
      <View style={styles.section}>
        <TouchableOpacity>
          <Icon name={'heart-o'} size={26} color={Colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity>
          <TextElement cStyle={styles.lyrics}>LYRICS</TextElement>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPlay}>
        <Icon name={'play-circle'} size={66} color={Colors.active} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controllerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
  },
  lyrics: {
    marginHorizontal: 16,
    color: Colors.white,
  },
});

export default AlbumController;

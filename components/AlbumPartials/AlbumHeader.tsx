import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from '../resuable/TextElement';

const ALBUM_SIZE = Dimensions.get('window').width * 0.35;

interface AlbumHeaderType {
  name: string;
  imageCover: string;
  label: string;
  title: string;
  releaseDate: string;
  pressBack(): void;
}

const AlbumHeader: React.FC<AlbumHeaderType> = ({
  name,
  imageCover,
  label,
  title,
  releaseDate,
  pressBack,
}) => {
  const formattedReleaseDate = new Date(releaseDate).toLocaleDateString();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.sectionHeader}>
        <TextElement fontWeight={'bold'} cStyle={styles.artistStyle}>
          {name}
        </TextElement>
        <TextElement fontSize={'sm'} cStyle={styles.artistStyle}>
          {title}
        </TextElement>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pressBack} style={styles.icon}>
          <Icon name={'angle-left'} size={32} color={Colors.secondary} />
        </TouchableOpacity>
        <FastImage source={{uri: imageCover}} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <TextElement
          fontWeight={'bold'}
          cStyle={styles.labelStyle}
          fontSize={'sm'}>
          {label}
        </TextElement>
        <TextElement fontSize={'sm'} cStyle={styles.artistStyle}>
          {`Release on ${formattedReleaseDate}`}
        </TextElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.35,
  },
  imageContainer: {
    width: ALBUM_SIZE,
    height: ALBUM_SIZE,
    marginVertical: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  detailsContainer: {
    width: ALBUM_SIZE * 2,
  },
  sectionHeader: {
    width: ALBUM_SIZE * 2,
    alignItems: 'flex-end',
  },
  labelStyle: {
    color: Colors.white,
  },
  artistStyle: {
    color: Colors.white,
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: '-80%',
    opacity: 0.8,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 100,
  },
});

export default AlbumHeader;

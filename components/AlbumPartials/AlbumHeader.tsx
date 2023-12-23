import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from '../resuable/TextElement';
import {PropDimensions} from '../../dimensions/dimensions';

const ALBUM_SIZE = Dimensions.get('window').width * 0.18;

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
  title,
  releaseDate,
  pressBack,
}) => {
  const formattedReleaseDate = new Date(releaseDate).toLocaleDateString();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={pressBack} style={styles.icon}>
          <Icon name={'angle-left'} size={32} color={Colors.secondary} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <TextElement
            fontSize={'lg'}
            fontWeight={'bold'}
            cStyle={styles.artistStyle}>
            {name}
          </TextElement>
          <TextElement fontSize={'sm'} cStyle={{color: Colors.greyish}}>
            {`${title} - ${formattedReleaseDate}`}
          </TextElement>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <FastImage source={{uri: imageCover}} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.16,
    width: PropDimensions.inputWidth,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    width: '88%',
  },
  imageContainer: {
    width: ALBUM_SIZE,
    height: ALBUM_SIZE,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  sectionHeader: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistStyle: {
    color: Colors.white,
  },
  icon: {
    paddingRight: '8%',
  },
});

export default AlbumHeader;

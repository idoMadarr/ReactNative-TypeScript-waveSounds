import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from '../resuable/TextElement';

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
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pressBack}>
          <Icon
            name={'angle-left'}
            size={32}
            color={Colors.secondary}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Image source={{uri: imageCover}} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.section}>
          <TextElement cStyle={styles.artistStyle}>{name}</TextElement>
          <TextElement fontSize={'sm'} cStyle={styles.artistStyle}>
            {title}
          </TextElement>
        </View>
        <View style={styles.section}>
          <TextElement cStyle={styles.labelStyle} fontSize={'sm'}>
            {label}
          </TextElement>
          <TextElement fontSize={'sm'} cStyle={styles.artistStyle}>
            {formattedReleaseDate}
          </TextElement>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.42,
  },
  imageContainer: {
    width: 250,
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  detailsContainer: {
    width: 250,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelStyle: {
    color: Colors.white,
  },
  artistStyle: {
    textDecorationLine: 'underline',
    color: Colors.white,
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: '-20%',
    opacity: 0.6,
    zIndex: 100,
  },
});

export default AlbumHeader;

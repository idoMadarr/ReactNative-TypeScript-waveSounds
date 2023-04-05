import React from 'react';
import {ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useAppDispatch} from '../redux/hooks';
import {toggleSpinner} from '../redux/slices/authSlice';
import {fetchAlbum} from '../redux/actions/deezerActions';
import {useNavigation} from '@react-navigation/native';
import Colors from '../assets/design/palette.json';
import {SequenceType} from '../types/Types';

// Components
import TextElement from './resuable/TextElement';

const Sequence: React.FC<SequenceType> = ({albums}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPress = async (albumId: string) => {
    dispatch(toggleSpinner());
    const albumData = await dispatch(fetchAlbum(albumId));
    // @ts-ignore: Unsupported navigate type
    // TODO: Modal for error handling in case we dont get any data
    navigation.navigate('album', {albumData});
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {albums.map(({id, title, artist, image}) => (
        <TouchableOpacity
          key={id}
          activeOpacity={0.8}
          onPress={onPress.bind(this, id)}>
          <FastImage source={{uri: image}} style={styles.image} />
          <View style={{marginHorizontal: 8}}>
            <TextElement numberOfLines={1} cStyle={styles.text}>
              {title}
            </TextElement>
            <TextElement
              fontWeight={'light'}
              cStyle={styles.text}
              fontSize={'sm'}>
              {artist}
            </TextElement>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 125,
    margin: 8,
    borderRadius: 15,
  },
  text: {
    width: 150,
    color: Colors.white,
  },
});

export default Sequence;

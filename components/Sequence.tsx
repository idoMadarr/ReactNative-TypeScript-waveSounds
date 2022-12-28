import React from 'react';
import {ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Colors from '../assets/design/palette.json';
import {SequenceType} from '../types/sequence';

// Components
import TextElement from './resuable/TextElement';

const Sequence: React.FC<SequenceType> = ({albums}) => {
  const navigation = useNavigation();

  const onPress = (albumId: number) => {
    // @ts-ignore: Unsupported navigate type
    navigation.navigate('album', {albumId});
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

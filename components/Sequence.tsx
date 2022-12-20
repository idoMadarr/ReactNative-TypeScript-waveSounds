import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Colors from '../assets/design/palette.json';

// Components
import TextElement from './resuable/TextElement';

interface Track {
  id: number;
  title: string;
  subtitle: string;
  imageUri: string;
}

interface SequenceType {
  tracks: Track[];
}

const Sequence: React.FC<SequenceType> = ({tracks}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {tracks.map(({id, title, subtitle, imageUri}) => (
        <TouchableOpacity key={id} activeOpacity={0.8}>
          <Image source={{uri: imageUri}} style={styles.image} />
          <View style={{marginHorizontal: 8}}>
            <TextElement cStyle={styles.text}>{title}</TextElement>
            <TextElement
              fontWeight={'light'}
              cStyle={styles.text}
              fontSize={'sm'}>
              {subtitle}
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
    color: Colors.white,
  },
});

export default Sequence;

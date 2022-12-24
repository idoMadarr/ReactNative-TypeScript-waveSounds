import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import TextElement from '../resuable/TextElement';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PropDimensions} from '../../dimensions/dimensions';

interface TrackType {
  preview: string;
  title: string;
  initSoundTrack(url: string, index: number): void;
  indexIndicator: number;
  index: number;
}

const Track: React.FC<TrackType> = ({
  preview,
  title,
  initSoundTrack,
  indexIndicator,
  index,
}) => {
  return (
    <TouchableOpacity
      onPress={initSoundTrack.bind(this, preview, index)}
      style={[
        styles.TrackContainer,
        {
          backgroundColor:
            indexIndicator == index ? Colors.greyish : Colors.transparent,
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <TextElement
          numberOfLines={1}
          cStyle={index % 2 === 0 ? styles.active : styles.passive}>
          {title}
        </TextElement>
      </View>
      <View>
        <Icon
          name={'heart-o'}
          size={18}
          color={indexIndicator == index ? Colors.primary : Colors.greyish}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TrackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#5757573a',
    marginBottom: 5,
    borderRadius: 5,
  },
  active: {
    maxWidth: PropDimensions.cardWidth,
    color: Colors.active,
  },
  passive: {
    maxWidth: PropDimensions.cardWidth,
    color: Colors.white,
  },
});

export default Track;

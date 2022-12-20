import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {categories} from '../fixtures/sections.json';
import {PropDimensions} from '../dimensions/dimensions';
import Colors from '../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from './resuable/TextElement';
import Sequence from './Sequence';

const SectionList = () => {
  return (
    <LinearGradient
      colors={[
        Colors['gradient-start'],
        Colors['gradient-mid'],
        Colors['gradient-end'],
      ]}>
      {categories.map(({categoryId, name, tracks}) => (
        <View key={categoryId} style={styles.sequenceContainer}>
          <View style={styles.sectionContainer}>
            <Icon name={'caret-right'} size={28} color={Colors.secondary} />
            <TextElement fontSize={'lg'} cStyle={styles.categoryTitle}>
              {name}
            </TextElement>
          </View>
          <Sequence tracks={tracks} />
        </View>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  sequenceContainer: {
    width: PropDimensions.fullWidth,
    marginBottom: 26,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  categoryTitle: {
    padding: 8,
    color: Colors.white,
  },
});

export default SectionList;

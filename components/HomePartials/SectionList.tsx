import {View, StyleSheet} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import LinearGradient from 'react-native-linear-gradient';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from '../resuable/TextElement';
import Sequence from './Sequence';

const SectionList = () => {
  const sequenceTree = useAppSelector(state => state.deezerSlice.sequenceTree);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors['primary-shadow'], Colors.primary]}>
      {sequenceTree.map(({name, albums}) => (
        <View key={name} style={styles.sequenceContainer}>
          <View style={styles.sectionContainer}>
            <Icon name={'caret-right'} size={28} color={Colors.secondary} />
            <TextElement fontSize={'lg'} cStyle={styles.categoryTitle}>
              {name!}
            </TextElement>
          </View>
          <Sequence albums={albums} />
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
    backgroundColor: Colors.dark,
  },
  categoryTitle: {
    padding: 8,
    color: Colors.white,
  },
});

export default SectionList;

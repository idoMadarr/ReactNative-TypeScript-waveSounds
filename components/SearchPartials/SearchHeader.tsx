import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {SlideInLeft} from 'react-native-reanimated';
import Colors from '../../assets/design/palette.json';
import {PropDimensions} from '../../dimensions/dimensions';

// Components
import TextElement from '../resuable/TextElement';
import InputElement from '../resuable/InputElement';
import {View} from 'react-native';

interface SearchHeaderType {
  searchState: string;
  optimizeSearchFunc: any;
}

const SearchHeader: React.FC<SearchHeaderType> = ({
  searchState,
  optimizeSearchFunc,
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextElement
        fontSize={'xl'}
        cStyle={{color: Colors.white, width: PropDimensions.inputWidth}}>
        Search
      </TextElement>
      <Animated.View entering={SlideInLeft}>
        <InputElement
          value={searchState}
          onChange={optimizeSearchFunc}
          placeholder={'Search for any song or artist'}
          cStyle={styles.searchInput}
          icon={'search'}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 24,
  },
  searchInput: {
    zIndex: 100,
    backgroundColor: Colors.dark,
  },
});

export default SearchHeader;

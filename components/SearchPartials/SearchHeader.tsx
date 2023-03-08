import React, {Fragment} from 'react';
import Animated, {SlideInLeft} from 'react-native-reanimated';
import Colors from '../../assets/design/palette.json';
import {PropDimensions} from '../../dimensions/dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from '../resuable/TextElement';
import InputElement from '../resuable/InputElement';

interface SearchHeaderType {
  searchState: string;
  optimizeSearchFunc: any;
}

const SearchHeader: React.FC<SearchHeaderType> = ({
  searchState,
  optimizeSearchFunc,
}) => {
  return (
    <Fragment>
      <TextElement
        cStyle={{color: Colors.white, width: PropDimensions.inputWidth}}>
        Exploer our music streaming app that gives you access to over 90 million
        tracks worldwide and other audio content
      </TextElement>
      <Animated.View entering={SlideInLeft}>
        <InputElement
          value={searchState}
          onChange={optimizeSearchFunc}
          placeholder={'Search'}>
          <Icon name={'search'} size={28} color={Colors.primary} />
        </InputElement>
      </Animated.View>
    </Fragment>
  );
};

export default SearchHeader;

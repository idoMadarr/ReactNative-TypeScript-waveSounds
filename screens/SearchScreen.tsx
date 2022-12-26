import React, {useState, useCallback} from 'react';
import {FlatList, StyleSheet, SafeAreaView} from 'react-native';
import Animated, {SlideInLeft, SlideInRight} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch} from '../redux/hooks';
import Colors from '../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchSerchResults} from '../redux/actions/deezerActions';
import {PropDimensions} from '../dimensions/dimensions';

// Components
import StatusBarElement from '../components/resuable/StatusBarElement';
import InputElement from '../components/resuable/InputElement';
import TextElement from '../components/resuable/TextElement';

const SearchScreen = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState('');
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  const updateSearch = async (value: string) => {
    if (value === '') return;
    const results = await dispatch(fetchSerchResults(value));
    if (results) setSearchResults(results);
  };

  const debounce = (func: any) => {
    let timer: any;
    return (args: any) => {
      setSearchState(args);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(args);
      }, 500);
    };
  };

  const optimizeSearchFunc = useCallback(debounce(updateSearch), []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <TextElement
        cStyle={{color: Colors.white, width: PropDimensions.inputWidth}}>
        Exploer our music streaming app that gives you access to over 90 million
        tracks worldwide and other audio content
      </TextElement>
      {isFocused && (
        <Animated.View entering={SlideInLeft} exiting={SlideInRight}>
          <InputElement
            value={searchState}
            onChange={optimizeSearchFunc}
            placeholder={'Search'}>
            <Icon
              name={'search'}
              size={28}
              color={Colors.primary}
              // style={styles.details}
            />
          </InputElement>
        </Animated.View>
      )}
      {searchResults.length > 1 && (
        <FlatList
          keyExtractor={() => Math.random().toString()}
          data={searchResults}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => <TextElement>asd</TextElement>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
    backgroundColor: Colors.primary,
  },
});

export default SearchScreen;

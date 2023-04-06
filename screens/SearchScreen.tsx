import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {fetchSerchResults} from '../redux/actions/deezerActions';
import {setSearchResults} from '../redux/slices/deezerSlice';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import Colors from '../assets/design/palette.json';
import {TrackType} from '../types/Types';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';
import {initSoundTrack} from '../utils/soundTracker';

// Components
import StatusBarElement from '../components/resuable/StatusBarElement';
import SearchHeader from '../components/SearchPartials/SearchHeader';
import SearchItem from '../components/SearchPartials/SearchItem';
import {PropDimensions} from '../dimensions/dimensions';

const DEFAULT_SEARCH = 'poets of the fall';

const SearchScreen = () => {
  const searchResults = useAppSelector(
    state => state.deezerSlice.searchResults,
  );
  const [searchState, setSearchState] = useState(DEFAULT_SEARCH);

  const dispatch = useAppDispatch();

  useEffect(() => {
    optimizeSearchFunc(DEFAULT_SEARCH);
  }, []);

  const updateSearch = async (value: string) => {
    if (value === '') return;
    const results = await dispatch(fetchSerchResults(value));
    if (results) {
      dispatch(setSearchResults(results));
    }
  };

  const debounce = (func: Function) => {
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

  const playSoundTrack = (item: TrackType) => {
    const {id, title, artist, preview, image} = item;

    const createFloatingTrack = new FloatingPlayerInstance(
      id,
      title,
      artist,
      image,
      preview!,
    );

    initSoundTrack(preview!, searchResults, createFloatingTrack);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <SearchHeader
        optimizeSearchFunc={optimizeSearchFunc}
        searchState={searchState}
      />
      {searchResults.length > 1 && (
        <FlatList
          keyExtractor={itemData => itemData.id.toString()}
          data={searchResults}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          initialNumToRender={5}
          removeClippedSubviews={true}
          renderItem={({item, index}) => (
            <SearchItem
              title={item.title}
              artist={item.artist}
              image={item.image}
              index={index}
              playSoundTrack={playSoundTrack.bind(this, item)}
            />
          )}
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
  listContainer: {
    width: PropDimensions.favoriteWidth,
  },
});

export default SearchScreen;

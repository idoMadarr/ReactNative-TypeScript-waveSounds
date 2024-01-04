import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../assets/design/palette.json';
import {PropDimensions} from '../../dimensions/dimensions';

// Components
import TextElement from '../resuable/TextElement';
import InputElement from '../resuable/InputElement';

interface SearchHeaderType {
  searchState: string;
  optimizeSearchFunc: Function;
  startRecognizing(): void;
  isRecording: boolean;
}

const SearchHeader: React.FC<SearchHeaderType> = ({
  searchState,
  optimizeSearchFunc,
  startRecognizing,
  isRecording,
}) => {
  const inputRef: any = useRef();

  return (
    <View style={styles.searchContainer}>
      <TextElement
        fontSize={'xl'}
        cStyle={{color: Colors.white, width: PropDimensions.inputWidth}}>
        Search
      </TextElement>
      <InputElement
        inputRef={inputRef}
        value={searchState}
        onChange={optimizeSearchFunc}
        placeholder={'Search for any song or artist'}
        cStyle={{
          ...styles.searchInput,
          borderWidth: 1,
          borderColor: isRecording ? Colors.active : Colors.primary,
        }}
        onIcon={startRecognizing}
        icon={'microphone'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 24,
  },
  searchInput: {
    backgroundColor: Colors.dark,
  },
});

export default SearchHeader;

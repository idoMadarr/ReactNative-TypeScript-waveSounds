import React, {useEffect, useRef, useState} from 'react';
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
  stopRecognizing(): void;
  isRecording: boolean;
}

const SearchHeader: React.FC<SearchHeaderType> = ({
  searchState,
  optimizeSearchFunc,
  startRecognizing,
  stopRecognizing,
  isRecording,
}) => {
  const inputRef: any = useRef();
  const [iconType, setIconType] = useState('microphone');

  useEffect(() => {
    if (searchState.length) {
      return setIconType('search');
    }
    setIconType('microphone');
  }, [searchState]);

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
          borderColor: isRecording ? Colors.active : Colors.primary,
        }}
        icon={iconType}
        onIcon={() => {
          if (iconType === 'microphone') {
            startRecognizing();
          }
        }}
        onPressOut={stopRecognizing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: '10%',
  },
  searchInput: {
    borderWidth: 1,
    backgroundColor: Colors.dark,
  },
});

export default SearchHeader;

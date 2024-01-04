import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../../redux/hooks';

interface RecorderElementType {
  isRecording: boolean;
  startRecognizing(): void;
  stopRecognizing(): void;
}

const RecorderElement: React.FC<RecorderElementType> = ({
  isRecording,
  startRecognizing,
  stopRecognizing,
}) => {
  const microphonePermission = useAppSelector(
    state => state.authSlice.microphonePermission,
  );

  const PressableType = microphonePermission
    ? TouchableOpacity
    : (View as React.JSX.Element | any);

  return (
    <PressableType
      activeOpacity={0.8}
      onPressIn={startRecognizing}
      onPressOut={stopRecognizing}
      style={styles.container}>
      <Icon
        name={'microphone'}
        size={28}
        color={isRecording ? Colors.warning : Colors.primary}
      />
    </PressableType>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PropDimensions.inputHight,
    height: PropDimensions.inputHight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    elevation: 3,
    backgroundColor: Colors.light,
  },
});

export default RecorderElement;

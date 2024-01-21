import React from 'react';
import {
  View,
  ActivityIndicator,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import Colors from '../../assets/design/palette.json';
import {PropDimensions} from '../../dimensions/dimensions';

// Components
import TextElement from './TextElement';

interface ButtonElementType {
  title: string;
  onPress(): void;
  backgroundColor: string;
  titleColor: string;
  customStyle?: object;
  setSpinner?: boolean;
}

const ButtonElement: React.FC<ButtonElementType> = ({
  title,
  onPress,
  backgroundColor,
  titleColor,
  setSpinner,
  customStyle,
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: backgroundColor},
          {...customStyle},
        ]}>
        {setSpinner ? (
          <ActivityIndicator size={'large'} color={Colors.white} />
        ) : (
          <TextElement
            fontWeight={'bold'}
            cStyle={{
              color: titleColor,
            }}>
            {title}
          </TextElement>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: PropDimensions.buttonWidth,
    height: PropDimensions.buttonHight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ButtonElement;

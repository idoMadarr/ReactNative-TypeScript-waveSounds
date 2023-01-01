import React from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
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
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: backgroundColor,
          width: PropDimensions.buttonWidth,
          height: PropDimensions.buttonHight,
          ...customStyle,
        },
      ]}
      activeOpacity={0.6}>
      <View>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default ButtonElement;

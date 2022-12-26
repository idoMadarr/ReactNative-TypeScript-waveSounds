import React, {useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';

// Components
import TextElement from './TextElement';

interface InputElementType {
  value?: string;
  onChange(e: NativeSyntheticEvent<TextInputChangeEventData>): void;
  placeholder: string;
  errorMessage?: string;
  keyboard?: any;
  cStyle?: object;
  maxLength?: number;
  children?: JSX.Element | JSX.Element[] | string;
  editable?: boolean;
  secureTextEntry?: boolean;
  setSecureTextEntry?(): void;
  onIcon?(): void;
}

const InputElement: React.FC<InputElementType> = ({
  value,
  onChange,
  errorMessage,
  keyboard,
  placeholder,
  secureTextEntry,
  setSecureTextEntry,
  maxLength,
  onIcon,
  cStyle,
  editable,
  children,
}) => {
  useEffect(() => {
    if (value?.length) {
      focusAnimation();
    }
  }, []);

  const onPressIcon = () => {
    setSecureTextEntry && setSecureTextEntry();
    onIcon && onIcon();
  };

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: withTiming(scale.value)}],
      opacity: withTiming(opacity.value),
    };
  });

  const focusAnimation = () => {
    opacity.value = 0;
    scale.value = 1.5;
  };

  const blurAnimation = () => {
    if (value?.length) return;
    opacity.value = 1;
    scale.value = 1;
  };

  const displayIcon = children && (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={onPressIcon}
        style={[styles.inputWithIcon, {flexDirection: 'row'}]}>
        {children}
      </TouchableOpacity>
    </View>
  );

  const displayPlaceholder = (
    <Animated.View style={[animatedStyle, styles.placeholderContainer]}>
      <TouchableOpacity onPress={focusAnimation} activeOpacity={0.9}>
        <TextElement cStyle={{zIndex: 500}} fontSize={'sm'}>
          {placeholder}
        </TextElement>
      </TouchableOpacity>
    </Animated.View>
  );

  const displayError = (
    <TextElement
      cStyle={{...styles.error, color: Colors.warning}}
      fontSize={'sm'}>
      {errorMessage ? errorMessage : ''}
    </TextElement>
  );

  return (
    <View style={styles.InputElementConainer}>
      {displayPlaceholder}
      <TextInput
        value={value}
        onChangeText={onChange}
        onFocus={focusAnimation}
        onBlur={blurAnimation}
        keyboardType={keyboard ? keyboard : 'default'}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        editable={editable}
        allowFontScaling={false}
        style={[
          styles.input,
          {
            backgroundColor: Colors.secondary,
          },
          cStyle,
        ]}
      />
      {displayIcon}
      {displayError}
    </View>
  );
};

const styles = StyleSheet.create({
  InputElementConainer: {
    height: PropDimensions.inputContainerHight,
    marginVertical: 5,
  },
  input: {
    width: PropDimensions.inputWidth,
    paddingHorizontal: 8,
    height: PropDimensions.inputHight,
    borderRadius: 5,
  },
  inputWithIcon: {
    width: '38%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    paddingLeft: 5,
    maxWidth: PropDimensions.inputWidth,
  },
  iconContainer: {
    position: 'absolute',
    top: '8%',
    left: Dimensions.get('window').width * 0.75,
  },
  placeholderContainer: {
    position: 'absolute',
    top: '20%',
    left: '2%',
    justifyContent: 'center',
    zIndex: 100,
  },
});

export default InputElement;

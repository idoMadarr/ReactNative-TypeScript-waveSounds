import React, {useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PropDimensions} from '../../dimensions/dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  editable?: boolean;
  secureTextEntry?: boolean;
  setSecureTextEntry?: Function;
  icon?: string;
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
  icon,
  onIcon,
  cStyle,
  editable,
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

  const displayIcon = icon && (
    <Pressable onPress={onPressIcon} style={styles.iconContainer}>
      <Icon name={icon} size={28} color={Colors.primary} />
    </Pressable>
  );

  const displayPlaceholder = (
    <Animated.View style={[animatedStyle, styles.placeholderContainer]}>
      <TouchableOpacity onPress={focusAnimation} activeOpacity={0.9}>
        <TextElement
          cStyle={{zIndex: 500, color: Colors.black}}
          fontSize={'sm'}>
          {placeholder}
        </TextElement>
      </TouchableOpacity>
    </Animated.View>
  );

  const displayError = (
    <TextElement
      cStyle={{...styles.error, color: Colors.warning}}
      fontSize={'sm'}
      fontWeight={'bold'}>
      {errorMessage ? errorMessage : ''}
    </TextElement>
  );

  return (
    <View style={styles.InputElementConainer}>
      {displayPlaceholder}
      <TextInput
        value={value}
        // @ts-ignore:
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
  },
  input: {
    width: PropDimensions.inputWidth,
    paddingHorizontal: 8,
    height: PropDimensions.inputHight,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  error: {
    paddingLeft: 5,
    maxWidth: PropDimensions.inputWidth,
  },
  iconContainer: {
    width: '15%',
    height: PropDimensions.inputHight,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: Dimensions.get('window').width * 0.7,
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

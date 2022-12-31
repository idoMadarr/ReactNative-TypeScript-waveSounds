import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Colors from '../../assets/design/palette.json';

interface TextElementType {
  children: JSX.Element | JSX.Element[] | string;
  fontSize?: string;
  fontWeight?: string;
  cStyle?: object;
  numberOfLines?: number;
}

const TextElement: React.FC<TextElementType> = ({
  children,
  fontSize,
  fontWeight,
  cStyle = {},
  numberOfLines,
}) => {
  const setFontSize = (size: string = 'm') =>
    size === 'sm' ? 12 : size === 'm' ? 14 : size === 'lg' ? 20 : 34;

  const setFontFamily = (font: string = 'Poppins-Regular') =>
    font === 'bold'
      ? 'Poppins-Bold'
      : font === 'light'
      ? 'Poppins-Light'
      : 'Poppins-Regular';

  const styles = StyleSheet.create({
    constants: {
      fontSize: setFontSize(fontSize),
      fontFamily: setFontFamily(fontWeight),
      color: Colors.white,
    },
  });

  return (
    <Text numberOfLines={numberOfLines} style={[styles.constants, {...cStyle}]}>
      {children}
    </Text>
  );
};

export default TextElement;

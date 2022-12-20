import React from 'react';
import {Text} from 'react-native';

interface TextElementType {
  children: JSX.Element | JSX.Element[] | string;
  fontSize?: string;
  fontWeight?: string;
  cStyle?: object;
}

const TextElement: React.FC<TextElementType> = ({
  children,
  fontSize,
  fontWeight,
  cStyle = {},
}) => {
  const setFontSize = (size: string = 'm') =>
    size === 'sm' ? 10 : size === 'm' ? 14 : size === 'lg' ? 20 : 34;

  const setFontFamily = (font: string = 'Poppins-Regular') =>
    font === 'bold'
      ? 'Poppins-Bold'
      : font === 'light'
      ? 'Poppins-Light'
      : 'Poppins-Regular';

  const styles = {
    ...cStyle,
    fontSize: setFontSize(fontSize),
    fontFamily: setFontFamily(fontWeight),
  };

  return <Text style={styles}>{children}</Text>;
};

export default TextElement;

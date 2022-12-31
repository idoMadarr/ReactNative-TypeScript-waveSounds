import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../assets/design/palette.json';
import {useNavigation} from '@react-navigation/native';

// Components
import TextElement from './TextElement';

interface LinkElementType {
  children: JSX.Element | JSX.Element[] | string;
  url: string;
}

const LinkElement: React.FC<LinkElementType> = ({children, url}) => {
  const navigation = useNavigation();

  //   @ts-ignore:
  const onPress = () => navigation.navigate(url);

  return (
    <TouchableOpacity onPress={onPress}>
      <TextElement cStyle={styles.linkColor}>{children}</TextElement>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkColor: {
    color: Colors.active,
  },
});

export default LinkElement;

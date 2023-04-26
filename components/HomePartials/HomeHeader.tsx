import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {setUpdate} from '../../redux/slices/authSlice';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
// @ts-ignore:
import FaviconVector from '../../assets/vectors/waveSounds-favicon.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from '../resuable/TextElement';

const faviconSize = Dimensions.get('window').width * 0.12;

const HomeHeader = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const isUpdate = useAppSelector(state => state.authSlice.isUpdate);

  const dispatch = useAppDispatch();

  const onMenu = () => {
    dispatch(setUpdate(false));
    navigation.openDrawer();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logo}>
        <FaviconVector height={faviconSize} width={faviconSize} />
        <TextElement>WaveSounds</TextElement>
      </View>
      <TouchableOpacity onPress={onMenu} style={styles.menu}>
        {isUpdate && <View style={styles.dotUpdate} />}
        <Icon name={'gear'} size={28} color={Colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    width: PropDimensions.fullWidth,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotUpdate: {
    width: 10,
    height: 10,
    backgroundColor: Colors.active,
    borderRadius: 50,
    position: 'absolute',
    top: '20%',
    right: '20%',
  },
});

export default HomeHeader;

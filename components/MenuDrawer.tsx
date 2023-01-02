import React from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {clearStorage} from '../utils/asyncStorage';
import LinearGradient from 'react-native-linear-gradient';
import {resetDezeerSlice} from '../redux/slices/deezerSlice';
import {resetAuthSlice} from '../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/design/palette.json';

// Components
import TextElement from './resuable/TextElement';
import FastImage from 'react-native-fast-image';
import ButtonElement from './resuable/ButtonElement';

const MenuDrawer = () => {
  const user = useAppSelector(state => state.authSlice.user)!;
  const artists = useAppSelector(state => state.deezerSlice.artists);
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    dispatch(resetAuthSlice());
    dispatch(resetDezeerSlice());
    await clearStorage();
  };

  return (
    <LinearGradient
      colors={[Colors['gradient--modal-start'], Colors['gradient-modal-end']]}
      style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Icon
          name={'user-circle-o'}
          size={48}
          color={Colors.active}
          style={{marginBottom: 8}}
        />
        <TextElement fontSize={'sm'} fontWeight="bold" cStyle={styles.headers}>
          {user.username}
        </TextElement>
        <TextElement fontSize={'sm'} cStyle={styles.headers}>
          Check your favorites tracks:
        </TextElement>
      </View>
      <FlatList
        keyExtractor={itemData => itemData.id}
        data={artists}
        style={styles.artistsContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.artistItem}>
            <TextElement fontSize={'sm'} cStyle={{color: Colors.white}}>
              {item.name}
            </TextElement>
            <FastImage source={{uri: item.image}} style={styles.artistImage} />
          </View>
        )}
      />
      <ButtonElement
        title={'Logout'}
        backgroundColor={Colors.primary}
        titleColor={Colors.warning}
        customStyle={styles.logout}
        onPress={onLogout}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  drawerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  artistsContainer: {
    marginVertical: 10,
    height: Dimensions.get('window').height * 0.8,
  },
  artistItem: {
    borderBottomWidth: 1,
    marginHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.greyish,
  },
  artistImage: {
    width: 80,
    height: 70,
    borderRadius: 50,
  },
  headers: {
    color: Colors.white,
    textAlign: 'center',
  },
  logout: {
    width: 100,
    borderWidth: 1,
    borderColor: Colors.placeholder,
  },
});

export default MenuDrawer;

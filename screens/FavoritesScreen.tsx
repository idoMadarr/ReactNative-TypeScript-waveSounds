import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import Colors from '../assets/design/palette.json';

// // Components
import FavoritesList from '../components/FavoritesPartials/FavoritesList';
import StatusBarElement from '../components/resuable/StatusBarElement';

const FavoritesScreen = () => {
  const favorites = useAppSelector(state => state.authSlice.favorites);

  return (
    <SafeAreaView style={[styles.screen]}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <FavoritesList favorites={favorites} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
});

export default FavoritesScreen;

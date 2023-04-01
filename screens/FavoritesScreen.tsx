import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import Colors from '../assets/design/palette.json';
import LinearGradient from 'react-native-linear-gradient';

// // Components
import FavoritesList from '../components/FavoritesPartials/FavoritesList';
import StatusBarElement from '../components/resuable/StatusBarElement';

const FavoritesScreen = () => {
  const favorites = useAppSelector(state => state.authSlice.favoritesList);

  return (
    <SafeAreaView style={[styles.screen]}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <LinearGradient
        style={styles.main}
        colors={[
          Colors['gradient-end'],
          Colors['gradient-mid'],
          Colors['gradient-start'],
        ]}>
        <FavoritesList favorites={favorites} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  main: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});

export default FavoritesScreen;

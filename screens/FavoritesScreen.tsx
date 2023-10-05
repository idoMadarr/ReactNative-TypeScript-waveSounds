import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import Colors from '../assets/design/palette.json';
import LinearGradient from 'react-native-linear-gradient';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';
import {initSoundTrack} from '../utils/soundTracker';
import {TrackType} from '../types/Types';

// Components
import FavoriteHeader from '../components/FavoritesPartials/FavoriteHeader';
import FavoritesList from '../components/FavoritesPartials/FavoritesList';
import StatusBarElement from '../components/resuable/StatusBarElement';

const FavoritesScreen = () => {
  const favorites = useAppSelector(state => state.authSlice.favoritesList);

  const onPlay = (item: TrackType) => {
    const createFloatingTrack = new FloatingPlayerInstance(
      item.id.toString(),
      item.title,
      item.artist,
      item.image,
      item.preview!,
    );
    initSoundTrack(item.preview!, favorites, createFloatingTrack);
  };

  return (
    <SafeAreaView style={[styles.screen]}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <LinearGradient
        style={styles.main}
        colors={[Colors.primary, Colors['primary-shadow'], Colors.primary]}>
        <FavoriteHeader counter={favorites.length} />
        <FavoritesList favorites={favorites} onPlay={onPlay} />
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

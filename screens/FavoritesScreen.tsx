import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import Colors from '../assets/design/palette.json';
import LinearGradient from 'react-native-linear-gradient';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';
import {initSoundTrack} from '../utils/soundTracker';

// Components
import FavoriteHeader from '../components/FavoritesPartials/FavoriteHeader';
import FavoritesList from '../components/FavoritesPartials/FavoritesList';
import StatusBarElement from '../components/resuable/StatusBarElement';
import {TrackType} from '../types/Types';

const FavoritesScreen = () => {
  const favorites = useAppSelector(state => state.authSlice.favoritesList);
  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  );

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
        backgroundColor={Colors['gradient-start']}
      />
      <LinearGradient
        style={styles.main}
        colors={[
          Colors['gradient-start'],
          Colors['gradient-end'],
          Colors['gradient-mid'],
        ]}>
        <FavoriteHeader
          counter={favorites.length}
          floatingPlayer={floatingPlayer}
          onPlay={onPlay.bind(this, favorites[0])}
        />
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

import React, {useEffect} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/design/palette.json';
import {setCurrentAlbum} from '../redux/slices/deezerSlice';
import {TrackType} from '../types/Types';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';
import {initSoundTrack} from '../utils/soundTracker';
import {goBack} from '../utils/rootNavigation';

// Components
import AlbumHeader from '../components/AlbumPartials/AlbumHeader';
import AlbumTracks from '../components/AlbumPartials/AlbumTracks';
import StatusBarElement from '../components/resuable/StatusBarElement';

const AlbumScreen = () => {
  const dispatch = useAppDispatch();

  const currentIndexTrack = useAppSelector(
    state => state.deezerSlice.currentIndexTrack,
  );
  const albumData = useAppSelector(state => state.deezerSlice.currentAlbum!);

  useEffect(() => {
    return () => {
      dispatch(setCurrentAlbum(null));
    };
  }, []);

  const onPlay = (item: TrackType) => {
    const createFloatingTrack = new FloatingPlayerInstance(
      item.id,
      item.title,
      item.artist,
      item.image,
      item.preview!,
    );
    initSoundTrack(item.preview!, albumData?.tracks, createFloatingTrack);
  };

  const pressBack = () => goBack();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.black}
      />
      <ImageBackground style={styles.bgCard} source={{uri: albumData.image}}>
        <LinearGradient
          colors={[Colors.black, '#000000d6', Colors.black]}
          style={styles.screen}>
          <AlbumHeader
            title={albumData.title}
            label={albumData.label}
            imageCover={albumData.image}
            name={albumData.artist}
            releaseDate={albumData.releaseDate}
            pressBack={pressBack}
          />
          <AlbumTracks
            tracks={albumData?.tracks}
            onPlay={onPlay}
            indexIndicator={currentIndexTrack}
          />
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bgCard: {
    width: '100%',
    height: '100%',
  },
});

export default AlbumScreen;

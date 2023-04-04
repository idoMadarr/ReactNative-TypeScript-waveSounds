import React, {useState, useEffect, Fragment} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch} from '../redux/hooks';
import {fetchAlbum} from '../redux/actions/deezerActions';
import Colors from '../assets/design/palette.json';
import {AlbumTrack, AlbumType} from '../types/album';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';
import {initSoundTrack} from '../utils/soundTracker';

// Components
import AlbumHeader from '../components/AlbumPartials/AlbumHeader';
import AlbumTracks from '../components/AlbumPartials/AlbumTracks';
import StatusBarElement from '../components/resuable/StatusBarElement';
import {toggleSpinner} from '../redux/slices/authSlice';

type RootStackParamList = {
  album: any;
};

type AlbumScreenType = NativeStackScreenProps<RootStackParamList, 'album'>;

const AlbumScreen: React.FC<AlbumScreenType> = ({navigation, route}) => {
  const {albumId} = route.params as any;

  const [currentAlbum, setCurrentAlbum] = useState<AlbumType | null>(null);
  const [indexIndicator, setIndexIndicator] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleSpinner());
    initAlbum();
  }, []);

  const initAlbum = async () => {
    const albumData = await dispatch(fetchAlbum(albumId));
    dispatch(toggleSpinner());
    setCurrentAlbum(albumData);
  };

  const onPlay = (item: AlbumTrack, index: number) => {
    setIndexIndicator(index);
    const createFloatingTrack = new FloatingPlayerInstance(
      item.title,
      item.artist,
      item.image,
    );
    initSoundTrack(item.preview, currentAlbum?.tracks, createFloatingTrack);
  };

  const pressBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors['gradient-mid']}
      />
      <LinearGradient
        colors={[
          Colors['gradient-mid'],
          Colors['gradient-start'],
          Colors['gradient-end'],
        ]}>
        {!currentAlbum ? (
          <View>{/* <ClockLoader progress={progress} /> */}</View>
        ) : (
          <View style={styles.main}>
            <AlbumHeader
              title={currentAlbum.title}
              label={currentAlbum.label}
              imageCover={currentAlbum.image}
              name={currentAlbum.artist}
              releaseDate={currentAlbum.releaseDate}
              pressBack={pressBack}
            />
            <AlbumTracks
              tracks={currentAlbum.tracks}
              onPlay={onPlay}
              indexIndicator={indexIndicator}
            />
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  main: {
    alignSelf: 'center',
  },
});

export default AlbumScreen;

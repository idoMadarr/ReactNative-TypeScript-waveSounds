import React, {useState, useEffect, Fragment} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {fetchAlbum} from '../redux/actions/deezerActions';
import Colors from '../assets/design/palette.json';
import {AlbumType} from '../types/album';
import Sound from 'react-native-sound';
import soundTracker from '../utils/soundTracker';
import {setCurrentTrack, setMiniPlayer} from '../redux/slices/deezerSlice';

// Components
import AlbumHeader from '../components/AlbumPartials/AlbumHeader';
import AlbumController from '../components/AlbumPartials/AlbumController';
import AlbumTracks from '../components/AlbumPartials/AlbumTracks';
import StatusBarElement from '../components/resuable/StatusBarElement';
import ClockLoader from '../components/ClockLoader';

Sound.setCategory('Playback', true);

// @ts-ignore:
const AlbumScreen = ({navigation, route}) => {
  const {albumId} = route.params;

  const [currentAlbum, setCurrentAlbum] = useState<AlbumType | null>(null);
  const [indexIndicator, setIndexIndicator] = useState(0);
  const track = useAppSelector(state => state.deezerSlice.currentTrack);
  const dispatch = useAppDispatch();
  const progress = useSharedValue(0);

  useEffect(() => {
    initClockLoader();
    initAlbum();
  }, []);

  const initAlbum = async () => {
    const albumData = await dispatch(fetchAlbum(albumId));
    setCurrentAlbum(albumData);
  };

  useEffect(() => {
    soundTracker(track);
  }, [track]);

  const initSoundTrack = (url: string, index: number) => {
    if (track) {
      track.stop();
    }
    setIndexIndicator(index);
    const loadTrack = new Sound(url, '', async () => {
      dispatch(setCurrentTrack(loadTrack));
      dispatch(setMiniPlayer(currentAlbum?.tracks.data[index]));
    });
  };

  const pressBack = () => navigation.goBack();

  const initClockLoader = () => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors['gradient-mid']}
      />
      <LinearGradient
        style={styles.screen}
        colors={[
          Colors['gradient-mid'],
          Colors['gradient-start'],
          Colors['gradient-end'],
        ]}>
        {!currentAlbum ? (
          <View style={styles.loadingContainer}>
            <ClockLoader progress={progress} />
          </View>
        ) : (
          <Fragment>
            <AlbumHeader
              title={currentAlbum.title}
              label={currentAlbum.label}
              imageCover={currentAlbum.cover_medium}
              name={currentAlbum.artist.name}
              releaseDate={currentAlbum.release_date}
              pressBack={pressBack}
            />
            <AlbumController onPlay={() => {}} />
            <AlbumTracks
              tracks={currentAlbum.tracks.data}
              initSoundTrack={initSoundTrack}
              indexIndicator={indexIndicator}
            />
          </Fragment>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlbumScreen;

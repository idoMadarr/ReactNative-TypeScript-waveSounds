import {useEffect, useRef} from 'react';
import TrackPlayer, {Event} from 'react-native-track-player';
import {useAppDispatch} from '../redux/hooks';
import {
  setCurrentIndexTrack,
  setFloatingPlayer,
  setPlayerState,
} from '../redux/slices/deezerSlice';

const useTrackPlayer = () => {
  const dispatch = useAppDispatch();
  const playerInitialized = useRef(false);

  useEffect(() => {
    initPlayer();
    const trackChangedTrackChanged = TrackPlayer.addEventListener(
      Event.PlaybackActiveTrackChanged,
      data => {
        dispatch(setCurrentIndexTrack(data.index));
        dispatch(setFloatingPlayer(data.track));
      },
    );

    const trackPlaybackState = TrackPlayer.addEventListener(
      Event.PlaybackState,
      ({state}) => {
        dispatch(setPlayerState(state));
      },
    );

    return () => {
      trackChangedTrackChanged.remove();
      trackPlaybackState.remove();
    };
  }, []);

  const initPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer({maxCacheSize: 1024 * 10});
      await TrackPlayer.setVolume(0.8);
      //   await TrackPlayer.setRepeatMode(RepeatMode.Off);
      playerInitialized.current = true;
    } catch (error) {
      console.log('Track Player Error:', error);
    }
  };
};

export default useTrackPlayer;

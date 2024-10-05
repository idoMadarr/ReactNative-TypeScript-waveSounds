import {useEffect, useRef} from 'react';
import TrackPlayer, {Event} from 'react-native-track-player';
import {useAppDispatch} from '../redux/hooks';
import {
  setCurrentIndexTrack,
  setFloatingPlayer,
  setPlayerState,
} from '../redux/slices/deezerSlice';
import {PlayerContext, TrackType} from '../types/Types';
import {updatePlayerContext} from '../redux/slices/deezerSlice';
import store from '../redux/store';

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

export const initContextTrack = async (
  contextType: PlayerContext,
  tracks: TrackType[],
  playTrack: TrackType,
) => {
  const currentContext = store.getState().deezerSlice.playerContext;
  const isContextChange = currentContext === contextType;

  if (!isContextChange) {
    await TrackPlayer.reset();
    await store.dispatch(updatePlayerContext(contextType));
    await TrackPlayer.add(tracks);
  }

  const trackIndex = tracks.findIndex(item => item.url === playTrack.url);
  await TrackPlayer.skip(trackIndex);
  await TrackPlayer.play();
};

export const trackController = async (action: string, value?: number) => {
  if (action === 'time') {
    return await TrackPlayer.seekTo(value!);
  }

  if (action === 'volume') {
    return await TrackPlayer.setVolume(value!);
  }

  if (action === 'play') {
    return await TrackPlayer.play();
  }

  if (action === 'pause') {
    return await TrackPlayer.pause();
  }

  if (action === 'stop') {
    return await TrackPlayer.stop();
  }

  const queue = await TrackPlayer.getQueue();
  const currentIndexTrack = await TrackPlayer.getActiveTrackIndex();

  if (action === 'next') {
    const nextIndexTrack = currentIndexTrack! + 1;

    if (queue.length > nextIndexTrack) {
      await TrackPlayer.skipToNext();
      return store.dispatch(setFloatingPlayer(queue[nextIndexTrack]));
    }
    TrackPlayer.skip(0);
  }

  if (action === 'previous') {
    const backIndexTrack = currentIndexTrack! - 1;

    if (backIndexTrack > 0) {
      await TrackPlayer.skipToPrevious();
      return store.dispatch(setFloatingPlayer(queue[backIndexTrack]));
    }
    TrackPlayer.skip(queue.length - 1);
  }
};

export default useTrackPlayer;

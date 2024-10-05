import {PlayerContext, TrackType} from '../types/Types';
import store from '../redux/store';
import {updatePlayerContext} from '../redux/slices/deezerSlice';
import TrackPlayer from 'react-native-track-player';

export const initSoundTrack = async (
  contextType: PlayerContext,
  tracks: TrackType[],
  playTrack: TrackType,
) => {
  await handleContextChanges(contextType, tracks);
  const trackIndex = tracks.findIndex(item => item.url === playTrack.url);
  await TrackPlayer.skip(trackIndex);
  await TrackPlayer.play();
};

const handleContextChanges = async (
  contextType: PlayerContext,
  tracks: TrackType[],
) => {
  const currentContext = store.getState().deezerSlice.playerContext;
  const isContextChange = currentContext === contextType;

  if (!isContextChange) {
    await TrackPlayer.reset();
    await store.dispatch(updatePlayerContext(contextType));
    await TrackPlayer.add(tracks);
  }
};

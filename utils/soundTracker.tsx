import Sound from 'react-native-sound';
import {OptionsTrackType, TrackType} from '../types/Types';
import store from '../redux/store';
import {
  setCurrentTrack,
  setCurrentIndexTrack,
  setFloatingPlayer,
  setModalPlayerContext,
} from '../redux/slices/deezerSlice';

Sound.setCategory('Playback', true);

const soundTracker = (track: OptionsTrackType) => {
  if (track?.play) {
    track.play();
  }
};

export const initSoundTrack = async (
  preview: string,
  tracks?: TrackType[],
  playTrack?: TrackType,
) => {
  const trackIndex = tracks?.findIndex(item => item.preview === preview);
  await store.dispatch(setCurrentIndexTrack(trackIndex));
  const currentTrack = store.getState().deezerSlice.currentTrack;
  const loadTrack = new Sound(preview, '', () => {
    if (currentTrack) {
      currentTrack.stop(async () => {
        await currentTrack.release();
        store.dispatch(setModalPlayerContext(tracks));
        store.dispatch(setFloatingPlayer(playTrack));
        store.dispatch(setCurrentTrack(loadTrack));
      });
    } else {
      store.dispatch(setModalPlayerContext(tracks));
      store.dispatch(setFloatingPlayer(playTrack));
      store.dispatch(setCurrentTrack(loadTrack));
    }
  });
};

export default soundTracker;

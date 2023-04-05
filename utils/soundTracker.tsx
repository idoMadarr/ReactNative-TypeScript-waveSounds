import Sound from 'react-native-sound';
import {OptionsTrackType, TrackType} from '../types/Types';
import store from '../redux/store';
import {
  setCurrentTrack,
  setFloatingPlayer,
  setModalPlayerContext,
} from '../redux/slices/deezerSlice';

Sound.setCategory('Playback', true);

const soundTracker = (track: OptionsTrackType) => {
  if (track?.play) {
    track.play();
  }
};

export const initSoundTrack = (
  preview: string,
  tracks?: TrackType[],
  playTrack?: TrackType,
) => {
  const currentTrack = store.getState().deezerSlice.currentTrack;
  const loadTrack = new Sound(preview, '', async () => {
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

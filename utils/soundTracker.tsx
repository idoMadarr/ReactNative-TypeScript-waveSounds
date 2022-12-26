import {TrackType} from '../types/track';

const soundTracker = (track: TrackType) => {
  if (track?.play) {
    track.play();
  }
};

export default soundTracker;

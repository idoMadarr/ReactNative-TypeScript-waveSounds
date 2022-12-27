import {SingleTrackType} from '../types/TrackType';

const soundTracker = (track: SingleTrackType) => {
  if (track?.play) {
    track.play();
  }
};

export default soundTracker;

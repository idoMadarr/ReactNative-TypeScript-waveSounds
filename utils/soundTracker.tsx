const soundTracker = (track: any) => {
  if (track?.play) {
    track.play();
  }
};

export default soundTracker;

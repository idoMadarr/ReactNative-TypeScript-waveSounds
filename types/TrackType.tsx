export interface TrackType {
  id: number | string;
  title: string;
  artist: string;
  rank?: number;
  image: string;
  preview: string;
}

export interface SingleTrackType {
  play(): void;
  release(): void;
  stop(cb?: Function): void;
  pause(): void;
  _duration: any;
  setCurrentTime(val: number): void;
  getVolume(): void;
  getPan(): void;
  getCurrentTime(): void;
}

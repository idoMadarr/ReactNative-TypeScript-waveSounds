export interface TrackType {
  id: number;
  title: string;
  artist: string;
  rank?: number;
  image: string;
  preview: string;
}

export interface SingleTrackType {
  play(): void;
  release(): void;
  stop(): void;
  pause(): void;
  getVolume(): void;
  getPan(): void;
  getCurrentTime(): void;
}

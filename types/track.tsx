export interface TrackType {
  play(): void;
  release(): void;
  stop(): void;
  pause(): void;
  getVolume(): void;
  getPan(): void;
  getCurrentTime(): void;
}

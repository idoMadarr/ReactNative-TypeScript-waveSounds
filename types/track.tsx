export interface TrackType {
  play: (cb: () => void) => {};
  release(): void;
}

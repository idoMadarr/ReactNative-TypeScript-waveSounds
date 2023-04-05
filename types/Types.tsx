export interface AlbumType {
  title: string;
  artist: string;
  image: string;
  label: string;
  releaseDate: string;
  tracks: TrackType[];
}

export interface TrackType {
  id: string;
  title: string;
  image: string;
  preview?: string;
  artist: string;
}

export interface SequenceType {
  name?: string;
  albums: TrackType[];
}

export interface OptionsTrackType {
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

export interface UserType {
  id: string;
  email: string;
  username: string;
  createAt: string;
}

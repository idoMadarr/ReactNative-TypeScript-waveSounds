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

export interface OnlineListType {
  [socketId: string]: ConnectedOnlineType;
}

export interface ConnectedOnlineType {
  userId: number;
  username: string;
  online: boolean;
  socketAddress?: string;
}

export interface ChatMessageType {
  id: string;
  message: string;
  sender: string;
  recipient: string;
  timestamp: string;
  title?: string;
  artist?: string;
  image?: string;
  preview?: string;
}

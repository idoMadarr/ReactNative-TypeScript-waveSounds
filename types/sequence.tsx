export interface AlbumSequenceType {
  id: number;
  title: string;
  artist: string;
  image: string;
}

export interface SequenceType {
  albums: AlbumSequenceType[];
}

export interface SequencesType {
  name: string;
  albums: AlbumSequenceType[];
}

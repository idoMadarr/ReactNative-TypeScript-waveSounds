export interface AlbumType {
  title: string;
  artist: string;
  image: string;
  label: string;
  releaseDate: string;
  tracks: AlbumTrack[];
}

export interface AlbumTrack {
  id: string;
  title: string;
  image: string;
  preview: string;
  artist: string;
}

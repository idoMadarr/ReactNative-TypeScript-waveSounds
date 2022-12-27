export interface AlbumType {
  title: string;
  artist: string;
  image: string;
  label: string;
  releaseDate: string;
  tracks: AlbumTrack[];
}

export interface AlbumTrack {
  id: number;
  preview: string;
  album: {
    cover_medium: string;
  };
  title: string;
}

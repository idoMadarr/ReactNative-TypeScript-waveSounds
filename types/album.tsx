export interface AlbumType {
  artist: {
    name: string;
  };
  cover_medium: string;
  label: string;
  title: string;
  tracks: {
    data: AlbumTrack[];
  };
  release_date: string;
}

export interface AlbumTrack {
  id: number;
  preview: string;
  album: {
    cover_small: string;
  };
  title: string;
}

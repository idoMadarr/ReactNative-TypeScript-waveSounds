import {createSlice} from '@reduxjs/toolkit';
import {TrackType} from '../../types/tracks';

interface RootStateApp {
  tracks: TrackType[];
  // albums: any
  // artists: any
  // playlists: any
}

const initialState: RootStateApp = {
  tracks: [],
  // albums: null,
  // artists: null,
  // playlists: null,
};

export const deezerSlice = createSlice({
  name: 'deezer',
  initialState,
  reducers: {
    setDeezerChart: (state, action) => {
      const {tracks, albums, artists, playlists} = action.payload;
      state.tracks = tracks.data.map((track: any) => ({
        id: track.id,
        artist: track.artist.name,
        title: track.title,
        rank: track.rank,
        image: track.album.cover_medium,
        album: track.album.title,
      }));
      // state.tracks = tracks;
      // state.albums = albums;
      // state.artists = artists;
      // state.playlists = playlists;
    },
  },
});

export const {setDeezerChart} = deezerSlice.actions;

export default deezerSlice.reducer;

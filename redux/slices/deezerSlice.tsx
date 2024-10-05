import {createSlice} from '@reduxjs/toolkit';
import {
  TrackType,
  SequenceType,
  AlbumType,
  PlayerContext,
} from '../../types/Types';

interface RootStateApp {
  trends: TrackType[];
  artists: any;
  sequenceTree: SequenceType[];
  floatingPlayer: TrackType | null;
  currentAlbum: AlbumType | null;
  currentIndexTrack: number;
  searchResults: TrackType[];
  playerContext: PlayerContext | null;
  playerState: string | null;
}

const initialState: RootStateApp = {
  trends: [],
  artists: [],
  sequenceTree: [],
  floatingPlayer: null,
  currentAlbum: null,
  currentIndexTrack: 0,
  searchResults: [],
  playerContext: null,
  playerState: null,
};

export const deezerSlice = createSlice({
  name: 'deezer',
  initialState,
  reducers: {
    setDeezerChart: (state, action) => {
      state.trends = action.payload.trends;
      state.artists = action.payload.artists;
    },
    setSequence: (state, action) => {
      state.sequenceTree.push(action.payload);
    },
    setPlayerState: (state, action) => {
      state.playerState = action.payload;
    },
    setCurrentAlbum: (state, action) => {
      state.currentAlbum = action.payload;
    },
    setFloatingPlayer: (state, action) => {
      state.floatingPlayer = action.payload;
    },
    setCurrentIndexTrack: (state, action) => {
      state.currentIndexTrack = action.payload;
    },
    cleanFloatingPlayer: state => {
      state.floatingPlayer = null;
    },
    updatePlayerContext: (state, action) => {
      state.playerContext = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    resetDezeerSlice: state => {
      state.trends = [];
      state.artists = [];
      state.sequenceTree = [];
      state.floatingPlayer = null;
      state.searchResults = [];
    },
  },
});

export const {
  setDeezerChart,
  setSequence,
  setPlayerState,
  setFloatingPlayer,
  setCurrentAlbum,
  setCurrentIndexTrack,
  cleanFloatingPlayer,
  updatePlayerContext,
  setSearchResults,
  resetDezeerSlice,
} = deezerSlice.actions;

export default deezerSlice.reducer;

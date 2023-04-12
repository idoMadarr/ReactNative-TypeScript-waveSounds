import {createSlice} from '@reduxjs/toolkit';
import {TrackType, OptionsTrackType, SequenceType} from '../../types/Types';

interface RootStateApp {
  trends: TrackType[];
  artists: any;
  sequenceTree: SequenceType[];
  floatingPlayer: TrackType | null;
  currentTrack: OptionsTrackType | null;
  currentIndexTrack: number;
  searchResults: TrackType[];
  modalContext: TrackType[];
}

const initialState: RootStateApp = {
  trends: [],
  artists: [],
  sequenceTree: [],
  floatingPlayer: null,
  currentTrack: null,
  currentIndexTrack: 0,
  searchResults: [],
  modalContext: [],
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
    setFloatingPlayer: (state, action) => {
      state.floatingPlayer = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setCurrentIndexTrack: (state, action) => {
      state.currentIndexTrack = action.payload;
    },
    updateCurrentIndexTrack: (state, action) => {
      state.currentIndexTrack = state.currentIndexTrack + action.payload;
    },
    cleanFloatingPlayer: state => {
      state.currentTrack?.stop();
      state.floatingPlayer = null;
    },
    setModalPlayerContext: (state, action) => {
      state.modalContext = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    resetDezeerSlice: state => {
      state.trends = [];
      state.artists = [];
      state.sequenceTree = [];
      state.floatingPlayer = null;
      state.currentTrack = null;
      state.searchResults = [];
      state.modalContext = [];
    },
  },
});

export const {
  setDeezerChart,
  setSequence,
  setFloatingPlayer,
  setCurrentTrack,
  setCurrentIndexTrack,
  updateCurrentIndexTrack,
  cleanFloatingPlayer,
  setModalPlayerContext,
  setSearchResults,
  resetDezeerSlice,
} = deezerSlice.actions;

export default deezerSlice.reducer;

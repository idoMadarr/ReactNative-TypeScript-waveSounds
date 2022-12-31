import {createSlice} from '@reduxjs/toolkit';
import {SequencesType} from '../../types/sequence';
import {FloatingPlayerType} from '../../types/floating-player';
import {TrackType, SingleTrackType} from '../../types/TrackType';

interface RootStateApp {
  trends: TrackType[];
  artists: any;
  sequenceTree: SequencesType[];
  floatingPlayer: FloatingPlayerType | null;
  currentTrack: SingleTrackType | null;
  searchResults: TrackType[];
  modalContext: TrackType[];
}

const initialState: RootStateApp = {
  trends: [],
  artists: [],
  sequenceTree: [],
  floatingPlayer: null,
  currentTrack: null,
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
  },
});

export const {
  setDeezerChart,
  setSequence,
  setFloatingPlayer,
  setCurrentTrack,
  cleanFloatingPlayer,
  setModalPlayerContext,
  setSearchResults,
} = deezerSlice.actions;

export default deezerSlice.reducer;

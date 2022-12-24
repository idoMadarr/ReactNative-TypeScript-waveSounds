import {createSlice} from '@reduxjs/toolkit';
import {TrendType} from '../../types/trend';
import {SequencesType} from '../../types/sequence';
import {TrackType} from '../../types/track';
import {FloatingPlayerType} from '../../types/floating-player';

interface RootStateApp {
  trends: TrendType[];
  sequenceTree: SequencesType[];
  floatingPlayer: FloatingPlayerType | null;
  currentTrack: TrackType | null;
}

const initialState: RootStateApp = {
  trends: [],
  sequenceTree: [],
  floatingPlayer: null,
  currentTrack: null,
};

export const deezerSlice = createSlice({
  name: 'deezer',
  initialState,
  reducers: {
    setDeezerChart: (state, action) => {
      state.trends = action.payload;
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
      state.floatingPlayer = null;
    },
  },
});

export const {
  setDeezerChart,
  setSequence,
  setFloatingPlayer,
  setCurrentTrack,
  cleanFloatingPlayer,
} = deezerSlice.actions;

export default deezerSlice.reducer;

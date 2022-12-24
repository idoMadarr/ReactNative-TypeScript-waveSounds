import {createSlice} from '@reduxjs/toolkit';
import {TrendType} from '../../types/trend';
import {SequencesType} from '../../types/sequence';
import {MiniPlayerType} from '../../types/miniPlayer';
import {TrackType} from '../../types/track';

interface RootStateApp {
  trends: TrendType[];
  sequenceTree: SequencesType[];
  miniPlayer: MiniPlayerType;
  currentTrack: TrackType | null;
}

const initialState: RootStateApp = {
  trends: [],
  sequenceTree: [],
  miniPlayer: {
    active: false,
    track: {},
  },
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
    setMiniPlayer: (state, action) => {
      state.miniPlayer.track = action.payload;
      state.miniPlayer.active = true;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
  },
});

export const {setDeezerChart, setSequence, setMiniPlayer, setCurrentTrack} =
  deezerSlice.actions;

export default deezerSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {TrendType} from '../../types/trend';
import {CategoryType} from '../../types/category';
import {SequencesType} from '../../types/sequence';

interface RootStateApp {
  trends: TrendType[];
  categories: CategoryType[];
  sequenceTree: SequencesType[];
}

const initialState: RootStateApp = {
  trends: [],
  categories: [],
  sequenceTree: [],
};

export const deezerSlice = createSlice({
  name: 'deezer',
  initialState,
  reducers: {
    setDeezerChart: (state, action) => {
      state.trends = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload.data;
    },
    setSequence: (state, action) => {
      state.sequenceTree.push(action.payload);
    },
  },
});

export const {setDeezerChart, setCategories, setSequence} = deezerSlice.actions;

export default deezerSlice.reducer;

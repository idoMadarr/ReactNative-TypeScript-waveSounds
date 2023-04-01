import {createSlice} from '@reduxjs/toolkit';
import {UserType} from '../../types/UserType';
import {TrackType} from '../../types/TrackType';

interface RootStateApp {
  isAuth: boolean;
  user: UserType | null;
  favorites: TrackType[];
  loading: boolean;
}

const initialState: RootStateApp = {
  isAuth: false,
  user: null,
  favorites: [],
  loading: false,
};

export const authSlice = createSlice({
  name: 'deezer',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.loading = false;
    },
    resetAuthSlice: state => {
      state.isAuth = false;
      state.user = null;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    updateFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        favorite => favorite.id !== action.payload,
      );
    },
    toggleSpinner: state => {
      state.loading = !state.loading;
    },
  },
});

export const {
  setAuthentication,
  resetAuthSlice,
  setFavorites,
  updateFavorites,
  toggleSpinner,
} = authSlice.actions;

export default authSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {UserType, TrackType} from '../../types/Types';

interface RootStateApp {
  isAuth: boolean;
  user: UserType | null;
  favoritesList: TrackType[];
  favoritesObj: Object;
  drawerStatus: string;
  loading: boolean;
}

const initialState: RootStateApp = {
  isAuth: false,
  user: null,
  favoritesList: [],
  favoritesObj: {},
  drawerStatus: 'closed',
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
      state.favoritesList = action.payload.favoriteArray;
      state.favoritesObj = action.payload.favoritesObject;
    },
    newFavorite: (state, action) => {
      state.favoritesList.unshift(action.payload);
      state.favoritesObj = {
        ...state.favoritesObj,
        [action.payload.id]: action.payload,
      };
      state.loading = false;
    },
    updateFavorites: (state, action) => {
      state.favoritesList = state.favoritesList.filter(
        favorite => favorite.id !== action.payload,
      );
    },
    updateDrawerStatus: (state, action) => {
      state.drawerStatus = action.payload;
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
  newFavorite,
  updateFavorites,
  updateDrawerStatus,
  toggleSpinner,
} = authSlice.actions;

export default authSlice.reducer;

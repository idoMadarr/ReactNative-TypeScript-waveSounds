import {createSlice} from '@reduxjs/toolkit';
import {
  UserType,
  TrackType,
  OnlineListType,
  ChatMessageType,
} from '../../types/Types';

interface RootStateApp {
  isAuth: boolean;
  user: UserType | null;
  onlines: OnlineListType;
  chainChat: ChatMessageType[];
  favoritesList: TrackType[];
  favoritesObj: Object;
  isUpdate: boolean;
  drawerStatus: string;
  loading: boolean;
}

const initialState: RootStateApp = {
  isAuth: false,
  user: null,
  onlines: {},
  chainChat: [],
  favoritesList: [],
  favoritesObj: {},
  isUpdate: false,
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
    setOnlines: (state, action) => {
      state.onlines = action.payload;
    },
    updateOnline: (state, action) => {
      const method = action.payload.type;
      if (method === 'add') {
        // @ts-ignore:
        state.onlines = {
          ...state.onlines,
          [Object.keys(action.payload)[1]]: Object.values(action.payload)[1],
        };
        return;
      }
      delete state.onlines[Object.keys(action.payload)[1]];
    },
    updateChainChat: (state, action) => {
      state.chainChat.push(action.payload);
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
    setUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
    toggleSpinner: state => {
      state.loading = !state.loading;
    },
  },
});

export const {
  setAuthentication,
  setOnlines,
  updateOnline,
  updateChainChat,
  resetAuthSlice,
  setFavorites,
  newFavorite,
  updateFavorites,
  updateDrawerStatus,
  setUpdate,
  toggleSpinner,
} = authSlice.actions;

export default authSlice.reducer;

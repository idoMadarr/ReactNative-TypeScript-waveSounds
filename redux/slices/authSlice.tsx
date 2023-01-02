import {createSlice} from '@reduxjs/toolkit';
import {UserType} from '../../types/UserType';

interface RootStateApp {
  isAuth: boolean;
  user: UserType | null;
  loading: boolean;
}

const initialState: RootStateApp = {
  isAuth: false,
  user: null,
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
    toggleSpinner: state => {
      state.loading = !state.loading;
    },
  },
});

export const {setAuthentication, resetAuthSlice, toggleSpinner} =
  authSlice.actions;

export default authSlice.reducer;

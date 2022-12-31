import {createSlice} from '@reduxjs/toolkit';
import {UserType} from '../../types/UserType';

interface RootStateApp {
  isAuth: boolean;
  user: UserType | null;
}

const initialState: RootStateApp = {
  isAuth: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'deezer',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
  },
});

export const {setAuthentication} = authSlice.actions;

export default authSlice.reducer;

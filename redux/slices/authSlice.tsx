import {createSlice} from '@reduxjs/toolkit';

interface RootStateApp {
  isAuth: boolean;
}

const initialState: RootStateApp = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'deezer',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuth = true;
    },
  },
});

export const {setAuthentication} = authSlice.actions;

export default authSlice.reducer;

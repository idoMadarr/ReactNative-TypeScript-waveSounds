import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import deezerSlice from './slices/deezerSlice';
import authSlice from './slices/authSlice';

// Flipper Debug Configuration
// const createDebugger = require('redux-flipper').default;

const rootReducer = combineReducers({
  deezerSlice,
  authSlice,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({serializableCheck: false}).concat(createDebugger()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

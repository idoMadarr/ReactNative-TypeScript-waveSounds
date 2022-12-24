import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import deezerSlice from './slices/deezerSlice';

const rootReducer = combineReducers({
  deezerSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

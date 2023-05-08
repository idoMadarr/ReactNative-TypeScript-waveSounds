import {Dispatch} from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';
import {saveToStorage} from '../../utils/asyncStorage';
import {TrackType, UserType} from '../../types/Types';
import {
  setAuthentication,
  setFavorites,
  updateFavorites,
  newFavorite,
  setOnlines,
} from '../slices/authSlice';

interface AuthCredentialsType {
  email: string;
  username?: string;
  password?: string;
}

export const signIn =
  (state: AuthCredentialsType) => async (dispatch: Dispatch) => {
    const data: {user: UserType} = await axios.post('/ws-api/signin', state);
    if (!data) return;

    saveToStorage('userSession', data);
    dispatch(setAuthentication(data.user));
  };

export const signUp =
  (state: AuthCredentialsType) => async (dispatch: Dispatch) => {
    const data: {user: UserType} = await axios.post('/ws-api/signup', state);
    if (!data) return;

    saveToStorage('userSession', data);
    dispatch(setAuthentication(data.user));
  };

export const googleOAuth =
  (state: AuthCredentialsType) => async (dispatch: Dispatch) => {
    const data: {user: UserType} = await axios.post(
      '/ws-api/google-oauth',
      state,
    );
    if (!data) return;

    saveToStorage('userSession', data);
    dispatch(setAuthentication(data.user));
  };

export const fetchOnlines = () => async (dispatch: Dispatch) => {
  const data = await axios.get('/ws-api/connected-users');
  if (!data) return;

  dispatch(setOnlines(data));
};

export const fetchFavorites = () => async (dispatch: Dispatch) => {
  const data: TrackType[] = await axios.get('/ws-api/favorites');
  if (!data) return;

  const formattedData = data.reduce((accumulator: {}, currentValue) => {
    return {...accumulator, [currentValue.id]: currentValue};
  }, {});

  const payload = {favoriteArray: data, favoritesObject: formattedData};
  dispatch(setFavorites(payload));
};

export const addFavorite = (favorite: any) => async (dispatch: Dispatch) => {
  const data = await axios.post('/ws-api/add-favorite', favorite);
  if (!data) return;

  dispatch(newFavorite(data));
};

export const deleteFavorite =
  (favoriteId: string | number) => async (dispatch: Dispatch) => {
    dispatch(updateFavorites(favoriteId));
    await axios.delete(`/ws-api/remove-favorite/${favoriteId}`);
  };

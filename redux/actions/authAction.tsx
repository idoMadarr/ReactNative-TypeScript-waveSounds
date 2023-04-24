import {Dispatch} from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';
import {saveToStorage} from '../../utils/asyncStorage';
import {TrackType} from '../../types/Types';
import {
  setAuthentication,
  setFavorites,
  updateFavorites,
  newFavorite,
  toggleSpinner,
  setOnlines,
} from '../slices/authSlice';

interface AuthenticationCredentialsType {
  email: string;
  username?: string;
  password?: string;
}

export const signIn =
  (state: AuthenticationCredentialsType) => async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.post('/ws-api/signin', state);
      saveToStorage('userSession', data);
      dispatch(setAuthentication(data.user));
    } catch (error: any) {
      dispatch(toggleSpinner());
      const errorsList = error.response.data || 'Something went worng';
      return errorsList;
    }
  };

export const signUp =
  (state: AuthenticationCredentialsType) => async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.post('/ws-api/signup', state);
      saveToStorage('userSession', data);
      dispatch(setAuthentication(data.user));
    } catch (error: any) {
      dispatch(toggleSpinner());
      const errorsList = error.response.data || 'Something went worng';
      return errorsList;
    }
  };

export const googleOAuth =
  (state: AuthenticationCredentialsType) => async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.post('/ws-api/google-oauth', state);
      saveToStorage('userSession', data);
      dispatch(setAuthentication(data.user));
    } catch (error: any) {
      dispatch(toggleSpinner());
      const errorsList = error.response.data || 'Something went worng';
      return errorsList;
    }
  };

export const fetchOnlines = () => async (dispatch: Dispatch) => {
  try {
    const {data} = await axios.get('/ws-api/connected-users');
    dispatch(setOnlines(data));
  } catch (error: any) {
    const errorsList = error.response.data || 'Something went worng';
    return errorsList;
  }
};

export const fetchFavorites = () => async (dispatch: Dispatch) => {
  try {
    const {data} = await axios.get('/ws-api/favorites');
    const formattedData = data.reduce(
      (accumulator: {}, currentValue: TrackType) => {
        return {...accumulator, [currentValue.id]: currentValue};
      },
      {},
    );

    const payload = {favoriteArray: data, favoritesObject: formattedData};
    dispatch(setFavorites(payload));
  } catch (error: any) {
    const errors = error.response.data || 'Something went worng';
    return errors;
  }
};

export const addFavorite = (favorite: any) => async (dispatch: Dispatch) => {
  try {
    const {data} = await axios.post('/ws-api/add-favorite', favorite);
    dispatch(newFavorite(data));
  } catch (error: any) {
    dispatch(toggleSpinner());
    const errors = error.response.data || 'Something went worng';
    return errors;
  }
};

export const deleteFavorite =
  (favoriteId: string | number) => async (dispatch: Dispatch) => {
    try {
      dispatch(updateFavorites(favoriteId));
      await axios.delete(`/ws-api/remove-favorite/${favoriteId}`);
    } catch (error: any) {
      const errors = error.response.data || 'Something went worng';
      return errors;
    }
  };

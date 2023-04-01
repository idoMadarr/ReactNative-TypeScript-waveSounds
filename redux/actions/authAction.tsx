import {Dispatch} from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';
import {saveToStorage} from '../../utils/asyncStorage';
import {TrackType} from '../../types/TrackType';
import {
  setAuthentication,
  setFavorites,
  newFavorite,
  toggleSpinner,
} from '../slices/authSlice';

interface AuthenticationCredentialsType {
  email: string;
  username?: string;
  password: string;
}

interface AuthenticationResponseType {
  userJwt: string;
  existUser?: unknown;
  createUser?: unknown;
}

export const signIn =
  (state: AuthenticationCredentialsType) => async (dispatch: Dispatch) => {
    try {
      const {data}: {data: AuthenticationResponseType} = await axios.post(
        'https://wavesounds.onrender.com/ws-api/signin',
        state,
      );
      saveToStorage('userSession', data);
      dispatch(setAuthentication(data.existUser));
    } catch (error: any) {
      dispatch(toggleSpinner());
      const errorsList = error.response.data || 'Something went worng';
      return errorsList;
    }
  };

export const signUp =
  (state: AuthenticationCredentialsType) => async (dispatch: Dispatch) => {
    try {
      const {data}: {data: AuthenticationResponseType} = await axios.post(
        'https://wavesounds.onrender.com/ws-api/signup',
        state,
      );
      saveToStorage('userSession', data);
      dispatch(setAuthentication(data.createUser));
    } catch (error: any) {
      dispatch(toggleSpinner());
      const errorsList = error.response.data || 'Something went worng';
      return errorsList;
    }
  };

export const fetchFavorites = () => async (dispatch: Dispatch) => {
  try {
    const {data} = await axios.get(
      'https://wavesounds.onrender.com/ws-api/favorites',
    );
    const formattedData = data.reduce(
      (accumulator: {}, currentValue: TrackType) => {
        return {...accumulator, [currentValue.id]: currentValue};
      },
      {},
    );
    const payload = {favoriteArray: data, favoritesObject: formattedData};
    dispatch(setFavorites(payload));
  } catch (error: any) {
    dispatch(toggleSpinner());
    const errors = error.response.data || 'Something went worng';
    return errors;
  }
};

export const addFavorite = (favorite: any) => async (dispatch: Dispatch) => {
  try {
    const {data} = await axios.post(
      'https://wavesounds.onrender.com/ws-api/add-favorite',
      {...favorite, rank: 0},
    );
    dispatch(newFavorite(data));
  } catch (error: any) {
    dispatch(toggleSpinner());
    const errors = error.response.data || 'Something went worng';
    return errors;
  }
};

import {Dispatch} from '@reduxjs/toolkit';
import axios from 'axios';
import {saveToStorage} from '../../utils/asyncStorage';
import {setAuthentication, toggleSpinner} from '../slices/authSlice';

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

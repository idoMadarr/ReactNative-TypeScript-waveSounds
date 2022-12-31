import {Dispatch} from '@reduxjs/toolkit';
import axios from 'axios';
import {setAuthentication} from '../slices/authSlice';

interface AuthenticationCredentialsType {
  email: string;
  username?: string;
  password: string;
}

export const signIn =
  (state: AuthenticationCredentialsType) => async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.post(
        'http://10.0.2.2:4000/ws-api/signin',
        state,
      );
      dispatch(setAuthentication(data.existUser));
    } catch (error) {
      const errorsList = error.response.data || 'Something went worng';
      return errorsList;
    }
  };

export const signUp =
  (state: AuthenticationCredentialsType) => async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.post(
        'http://10.0.2.2:4000/ws-api/signup',
        state,
      );
      dispatch(setAuthentication(data.createUser));
    } catch (error) {
      const errorsList = error.response.data || 'Something went worng';
      return errorsList;
    }
  };

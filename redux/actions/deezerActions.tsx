import {Dispatch} from '@reduxjs/toolkit';
import axios from 'axios';
import {setDeezerChart} from '../slices/deezerSlice';

export const fetchDeezerChart = () => async (dispatch: Dispatch) => {
  const {data} = await axios.get('https://api.deezer.com/chart');
  dispatch(setDeezerChart(data));
};

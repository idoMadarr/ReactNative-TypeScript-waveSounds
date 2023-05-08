import axios from 'axios';
import Config from 'react-native-config';
import store from '../redux/store';
import {setModalMessage, toggleSpinner} from '../redux/slices/authSlice';

const development = Config.localhost;
const production = Config.production;

const axiosInstance = axios.create({
  baseURL: production,
  timeout: 15000,
});

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    store.dispatch(toggleSpinner());
    store.dispatch(setModalMessage(error.response.data.errors));
    return false;
  },
);

export default axiosInstance;

import axios from 'axios';
// import Config from 'react-native-config';

const localhost = 'http://localhost:4000/';
const production = 'https://wavesounds.onrender.com/ws-api/';

const axiosInstance = axios.create({
  baseURL: production,
  timeout: 10000,
});

export default axiosInstance;

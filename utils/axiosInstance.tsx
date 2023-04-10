import axios from 'axios';
// import Config from 'react-native-config';

const localhost = 'http://localhost:4000/ws-api/';
const production = 'https://wavesounds.onrender.com/ws-api/';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/ws-api/',
});

export default axiosInstance;

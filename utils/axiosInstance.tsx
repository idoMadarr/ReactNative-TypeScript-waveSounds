import axios from 'axios';
import Config from 'react-native-config';

const localhost = Config.localhost;
// const production = Config.production;

const axiosInstance = axios.create({
  // baseURL: localhost,
});

export default axiosInstance;

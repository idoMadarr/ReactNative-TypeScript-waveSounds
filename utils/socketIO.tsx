import {createContext} from 'react';
import SocketIO from 'socket.io-client';
import Config from 'react-native-config';

const development = Config.localhost;
const production = Config.production;

export const socket = SocketIO(production!);
export const SocketContext = createContext({});

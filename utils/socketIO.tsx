import {createContext} from 'react';
import SocketIO from 'socket.io-client';

export const socket = SocketIO('https://wavesounds.onrender.com/');
export const SocketContext = createContext({});

import {oauthSignout} from './OAuth';
import store from '../redux/store';
import {resetAuthSlice} from '../redux/slices/authSlice';
import {resetDezeerSlice} from '../redux/slices/deezerSlice';
import {clearStorage} from './asyncStorage';
import {userLogout} from '../redux/actions/authAction';
import {socket} from './socketIO';

export const onLogout = async () => {
  oauthSignout();
  await socket.emit('logout', store.getState().authSlice.user);
  await userLogout();
  store.dispatch(resetAuthSlice());
  store.dispatch(resetDezeerSlice());
  clearStorage();
  socket.disconnect();
};

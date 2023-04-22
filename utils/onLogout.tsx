import {oauthSignout} from './OAuth';
import store from '../redux/store';
import {resetAuthSlice} from '../redux/slices/authSlice';
import {resetDezeerSlice} from '../redux/slices/deezerSlice';
import {clearStorage} from './asyncStorage';

export const onLogout = async () => {
  oauthSignout();
  store.getState().deezerSlice.currentTrack?.stop();
  store.dispatch(resetAuthSlice());
  store.dispatch(resetDezeerSlice());
  clearStorage();
  // socket.disconnect();
};

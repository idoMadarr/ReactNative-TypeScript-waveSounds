import {
  request,
  PERMISSIONS,
  requestNotifications,
} from 'react-native-permissions';
import Voice from '@react-native-voice/voice';
import store from '../redux/store';
import {setMicrophonePermission} from '../redux/slices/authSlice';

export const askPermissions = async () => {
  await requestNotifications(['alert', 'sound']);

  const speechRecognitionService =
    (await Voice.getSpeechRecognitionServices()) as string[];

  const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);

  // Check is the service is available on the device
  if (!speechRecognitionService.length) {
    store.dispatch(setMicrophonePermission(false));
    return;
  }

  // Check for microphone permission
  if (result !== 'granted') {
    store.dispatch(setMicrophonePermission(false));
    return;
  }

  store.dispatch(setMicrophonePermission(true));
};

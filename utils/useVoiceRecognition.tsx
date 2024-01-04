import {useState, useCallback, useEffect} from 'react';
import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';
import {MicRecordType} from '../types/Types';

const defaultState = {
  recognized: '',
  pitch: '',
  error: '',
  end: '',
  started: false,
  results: [],
  partialsResults: [],
  isRecording: false,
};

export const useVoiceRecognition = () => {
  const [state, setState] = useState<MicRecordType>(defaultState);

  useEffect(() => {
    // onSpeechStart is the first listener that will fire immediatly when the user type for recording
    Voice.onSpeechStart = async () => {
      setState(prevState => ({
        ...prevState,
        started: true,
        isRecording: true,
      }));
    };

    // Voice.onSpeechRecognized = (event: any) => {
    //   console.log('onSpeechRecognized (2)', event);
    //   setState(prevState => ({...prevState, recognized: 'V'}));
    // };

    // onSpeechError will fire in case the recording is failed {"code": "7", "message": "7/No match"}
    Voice.onSpeechError = (event: SpeechErrorEvent) => {
      setState(prevState => ({
        ...prevState,
        error: JSON.stringify(event.error!.message?.split('/')[1]),
        isRecording: false,
      }));
    };

    // onSpeechResults is the last listener that will end the record session and give us the results { value: ["Hello"] }
    Voice.onSpeechResults = (event: SpeechResultsEvent) => {
      if (event.value) {
        setState(prevState => ({
          ...prevState,
          results: event.value!,
          isRecording: false,
        }));
      }
    };

    // onSpeechPartialResults will give us partials of the worls while recording - can be used for tracking specific works while user speaks { value: ["and welcome"] }
    Voice.onSpeechPartialResults = (event: SpeechResultsEvent) => {
      if (event.value) {
        setState(prevState => ({
          ...prevState,
          partialsResults: event.value!,
        }));
      }
    };

    // onSpeechVolumeChanged will run consistently for every ms while the phone is recording and give us the pitch/volume { value: 0.45842 }
    Voice.onSpeechVolumeChanged = (event: any) => {
      setState(prevState => ({
        ...prevState,
        pitch: event.value,
      }));
    };

    // Clearing any listeners when the user left the screen
    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
    };
  }, []);

  const resetState = useCallback(() => {
    setState(defaultState);
  }, [setState]);

  const startRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log(error);
    }
  }, []);

  const stopRecognizing = useCallback(async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cancelRecognizing = useCallback(async () => {
    try {
      await Voice.cancel();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const destroyRecognizing = useCallback(async () => {
    try {
      await Voice.destroy();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    state,
    setState,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destroyRecognizing,
  };
};

import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {setCurrentRecipient, updateChainChat} from '../redux/slices/authSlice';
import Colors from '../assets/design/palette.json';
import {SocketContext} from '../utils/socketIO';
import {MessageInstance} from '../models/MessageInstance';
import {ShareInstance} from '../models/ShareInstance';
import {PropDimensions} from '../dimensions/dimensions';
import {goBack} from '../utils/rootNavigation';
import {useVoiceRecognition} from '../utils/useVoiceRecognition';

// Components
import RecorderElement from '../components/resuable/RecorderElement';
import ChainChat from '../components/ChatPartials/ChainChat';
import ChatHeader from '../components/ChatPartials/ChatHeader';
import StatusBarElement from '../components/resuable/StatusBarElement';
import ButtonElement from '../components/resuable/ButtonElement';
import InputElement from '../components/resuable/InputElement';

const ChatScreen = ({}) => {
  const {state, startRecognizing, stopRecognizing} = useVoiceRecognition();

  const currentRecipient = useAppSelector(
    state => state.authSlice.currentRecipient!,
  );
  const currentUser = useAppSelector(state => state.authSlice.user);

  const chainId: string = (currentRecipient.id + currentUser!.id)
    .split('')
    .sort()
    .join('');
  const chainChat = useAppSelector(
    // @ts-ignore:
    state => state.authSlice.chatDict[chainId] || [],
  );
  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  )!;
  const shareMode = useAppSelector(state => state.authSlice.shareMode);

  const [messageState, setMessageState] = useState('');
  const inputRef = useRef() as any;

  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext) as any;
  const userSocketId = socket.id;

  useEffect(() => {
    return () => {
      dispatch(setCurrentRecipient(null));
    };
  }, []);

  useEffect(() => {
    if (shareMode) {
      gettingShareTrack();
    }
  }, [shareMode]);

  useEffect(() => {
    if (state.results.length) {
      inputRef.current?.focus();
      setMessageState(state.results![0]);
    }
  }, [state.results]);

  const onSend = async () => {
    if (!messageState.trim().length) return;
    Keyboard.dismiss();
    const newMessage = new MessageInstance(
      Math.random().toString(),
      messageState,
      socket.id,
      currentRecipient.socketId!,
      new Date().toLocaleString().split(',')[1],
      currentRecipient.id,
      currentUser.id,
    );
    await dispatch(updateChainChat(newMessage));
    await socket.emit('message', newMessage);
    setMessageState('');
  };

  const gettingShareTrack = async () => {
    const shareTrack = new ShareInstance(
      Math.random().toString(),
      `${currentRecipient.username} want to share track with you`,
      socket.id,
      currentRecipient.socketId!,
      new Date().toLocaleString().split(',')[1],
      currentRecipient.id,
      currentUser.id,
      floatingPlayer.title,
      floatingPlayer.artist,
      floatingPlayer.image,
      floatingPlayer.url,
    );
    dispatch(updateChainChat(shareTrack));
    await socket.emit('message', shareTrack);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors.primary}
      />
      <ChatHeader recipient={currentRecipient.username} goBack={goBack} />
      <ImageBackground
        source={require('../assets/images/WhatsApp-Wallpaper-HD.jpeg')}
        resizeMode={'stretch'}
        style={styles.chatBackground}>
        <View style={styles.chatContainer}>
          <ChainChat messagesList={chainChat} userSocketId={userSocketId} />
        </View>
        <View style={styles.controller}>
          <InputElement
            inputRef={inputRef}
            value={messageState}
            onChange={setMessageState}
            placeholder={'Message ...'}
            cStyle={styles.input}
          />
          {messageState.length ? (
            <ButtonElement
              title={'Send'}
              titleColor={Colors.black}
              backgroundColor={Colors.active}
              customStyle={styles.button}
              onPress={onSend}
            />
          ) : (
            <RecorderElement
              isRecording={state.isRecording}
              startRecognizing={startRecognizing}
              stopRecognizing={stopRecognizing}
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  chatContainer: {
    width: '85%',
    height: '88%',
    alignSelf: 'center',
  },
  chatBackground: {
    flex: 1,
  },
  controller: {
    opacity: 0.9,
    width: '100%',
    paddingHorizontal: '2%',
    height: PropDimensions.inputHight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  input: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: Colors.gesture,
    paddingLeft: 20,
    color: Colors.black,
    borderRadius: 25,
    fontWeight: 'bold',
    elevation: 3,
  },
  button: {
    width: PropDimensions.inputHight,
    height: PropDimensions.inputHight,
    borderRadius: 50,
    elevation: 3,
  },
});

export default ChatScreen;

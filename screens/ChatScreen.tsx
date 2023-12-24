import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {updateChainChat} from '../redux/slices/authSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Colors from '../assets/design/palette.json';
import {SocketContext} from '../utils/socketIO';
import {ConnectedOnlineType} from '../types/Types';
import {MessageInstance} from '../models/MessageInstance';
import {ShareInstance} from '../models/ShareInstance';
import {navigate} from '../utils/rootNavigation';

// Components
import ChainChat from '../components/ChatPartials/ChainChat';
import ChatHeader from '../components/ChatPartials/ChatHeader';
import StatusBarElement from '../components/resuable/StatusBarElement';
import ButtonElement from '../components/resuable/ButtonElement';
import InputElement from '../components/resuable/InputElement';
import {PropDimensions} from '../dimensions/dimensions';

type RootStackParamList = {
  user: ConnectedOnlineType;
};

// @ts-ignore:
type ChatScreenType = NativeStackScreenProps<RootStackParamList, 'chat'>;

const ChatScreen: React.FC<ChatScreenType> = ({navigation, route}) => {
  // @ts-ignore:
  const user = route.params!.user as ConnectedOnlineType;

  const currentUser = useAppSelector(state => state.authSlice.user);
  const chainId: string = (user.id + currentUser!.id).split('').sort().join('');
  const chainChat = useAppSelector(
    // @ts-ignore:
    state => state.authSlice.chatDict[chainId] || [],
  );

  const floatingPlayer = useAppSelector(
    state => state.deezerSlice.floatingPlayer,
  )!;
  const shareMode = useAppSelector(state => state.authSlice.shareMode);

  const [messageState, setMessageState] = useState('');

  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext) as any;
  const userSocketId = socket.id;

  useEffect(() => {
    if (shareMode) {
      gettingShareTrack();
    }
  }, [shareMode]);

  const goBack = () => {
    navigate('tabs', {screen: 'community'});
  };

  const onSend = async () => {
    if (!messageState.trim().length) return;
    Keyboard.dismiss();
    const newMessage = new MessageInstance(
      Math.random().toString(),
      messageState,
      socket.id,
      user.socketId!,
      new Date().toLocaleString().split(',')[1],
      user.id,
      currentUser.id,
    );
    await dispatch(updateChainChat(newMessage));
    await socket.emit('message', newMessage);
    setMessageState('');
  };

  const gettingShareTrack = async () => {
    const shareTrack = new ShareInstance(
      Math.random().toString(),
      `${user.username} want to share track with you`,
      socket.id,
      user.socketId!,
      new Date().toLocaleString().split(',')[1],
      user.id,
      currentUser.id,
      floatingPlayer.title,
      floatingPlayer.artist,
      floatingPlayer.image,
      floatingPlayer.preview!,
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
      <ChatHeader recipient={user.username} goBack={goBack} />
      <ImageBackground
        source={require('../assets/images/WhatsApp-Wallpaper-HD.jpeg')}
        resizeMode={'stretch'}
        style={styles.chatBackground}>
        <View style={styles.chatContainer}>
          <ChainChat messagesList={chainChat} userSocketId={userSocketId} />
        </View>
        <View style={styles.controller}>
          <InputElement
            value={messageState}
            onChange={setMessageState}
            placeholder={'Message ...'}
            cStyle={styles.input}
          />
          <ButtonElement
            title={'Send'}
            titleColor={Colors.black}
            backgroundColor={Colors.active}
            customStyle={styles.button}
            onPress={onSend}
          />
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
    height: '88%',
    width: '85%',
    alignSelf: 'center',
  },
  chatBackground: {
    flex: 1,
  },
  controller: {
    opacity: 0.9,
    position: 'absolute',
    width: '95%',
    height: PropDimensions.inputHight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    bottom: '2%',
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

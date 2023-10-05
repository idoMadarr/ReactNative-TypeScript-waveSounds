import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {updateChainChat} from '../redux/slices/authSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Colors from '../assets/design/palette.json';
import {SocketContext} from '../utils/socketIO';
import {ConnectedOnlineType} from '../types/Types';
import {MessageInstance} from '../models/MessageInstance';
import {ShareInstance} from '../models/ShareInstance';

// Components
import ChainChat from '../components/ChatPartials/ChainChat';
import ChatHeader from '../components/ChatPartials/ChatHeader';
import StatusBarElement from '../components/resuable/StatusBarElement';
import ButtonElement from '../components/resuable/ButtonElement';
import InputElement from '../components/resuable/InputElement';

type RootStackParamList = {
  user: ConnectedOnlineType;
};

// @ts-ignore:
type ChatScreenType = NativeStackScreenProps<RootStackParamList, 'chat'>;

const ChatScreen: React.FC<ChatScreenType> = ({navigation, route}) => {
  // @ts-ignore:
  // const user = route.params!.user as ConnectedOnlineType;
  const user = {
    userId: 234,
    username: 'dany',
    online: true,
    socketAddress: undefined,
  };
  const currentUser = useAppSelector(state => state.authSlice.user);
  const chainId = (user.userId + currentUser!.id).split('').sort().join('');
  const chainChat = useAppSelector(
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
    navigation.goBack();
  };

  const onSend = async () => {
    if (!messageState.trim().length) return;
    const newMessage = new MessageInstance(
      Math.random().toString(),
      messageState,
      socket.id,
      user.socketAddress!,
      new Date().toLocaleString().split(',')[1],
      user.userId,
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
      user.socketAddress!,
      new Date().toLocaleString().split(',')[1],
      user.userId,
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
        resizeMode={'cover'}
        style={styles.chatBackground}>
        <View style={styles.chatContainer}>
          <ChainChat messagesList={chainChat} userSocketId={userSocketId} />
        </View>
        <View style={styles.controller}>
          <InputElement
            value={messageState}
            onChange={setMessageState}
            placeholder={'Message'}
            cStyle={styles.input}
          />
          <ButtonElement
            title={'SEND'}
            titleColor={Colors.black}
            backgroundColor={Colors.secondary}
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
    height: '90%',
    width: '85%',
    alignSelf: 'center',
  },
  chatBackground: {
    flex: 1,
    opacity: 0.8,
    paddingBottom: 8,
  },
  controller: {
    width: Dimensions.get('window').width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  input: {
    width: Dimensions.get('window').width * 0.68,
    backgroundColor: Colors.light,
    paddingLeft: 20,
  },
  button: {
    width: Dimensions.get('window').width * 0.2,
  },
});

export default ChatScreen;

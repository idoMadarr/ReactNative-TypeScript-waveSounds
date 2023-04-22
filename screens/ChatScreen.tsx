import React, {useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {updateChainChat} from '../redux/slices/authSlice';
import Colors from '../assets/design/palette.json';
import {SocketContext} from '../utils/socketIO';
import {ConnectedOnlineType} from '../types/Types';

// Components
import ChainChat from '../components/ChatPartials/ChainChat';
import ChatHeader from '../components/ChatPartials/ChatHeader';
import StatusBarElement from '../components/resuable/StatusBarElement';
import ButtonElement from '../components/resuable/ButtonElement';
import InputElement from '../components/resuable/InputElement';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  user: ConnectedOnlineType;
};

type ChatScreenType = NativeStackScreenProps<RootStackParamList, 'chat'>;

const ChatScreen: React.FC<ChatScreenType> = ({navigation, route}) => {
  const chainChat = useAppSelector(state => state.authSlice.chainChat);
  const user = route.params!.user as ConnectedOnlineType;

  const [messageState, setMessageState] = useState('');

  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext) as any;
  const userSocketId = socket.id;

  const goBack = () => {
    navigation.goBack();
  };

  const onSend = async () => {
    const notification = {
      id: Math.random().toString(),
      message: messageState,
      sender: socket.id,
      recipient: user.socketAddress,
      timestamp: new Date().toLocaleString().split(',')[1],
    };
    await socket.emit('message', notification);
    dispatch(updateChainChat(notification));
    setMessageState('');
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

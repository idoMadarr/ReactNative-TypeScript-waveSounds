import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {SlideInLeft} from 'react-native-reanimated';
import {ChatMessageType} from '../../types/Types';

// Components
import TextElement from '../resuable/TextElement';

// Style
import Colors from '../../assets/design/palette.json';

interface ChatMessagePropsType {
  item: ChatMessageType;
  userSocketId: string;
  index: number;
}

const ChatMessage: React.FC<ChatMessagePropsType> = ({
  item,
  userSocketId,
  index,
}) => {
  const isSender = userSocketId === item.sender;

  return (
    <Animated.View
      entering={SlideInLeft.springify().delay(index * 100)}
      style={[
        styles.messageContainer,
        {
          backgroundColor: isSender ? Colors.active : Colors.secondary,
          alignSelf: isSender ? 'flex-start' : 'flex-end',
        },
      ]}>
      <TextElement cStyle={styles.black}>{item.message}</TextElement>
      <TextElement fontSize={'sm'} fontWeight={'bold'} cStyle={styles.black}>
        {item.timestamp}
      </TextElement>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  black: {
    color: Colors.black,
  },
});

export default ChatMessage;

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {ChatMessageType} from '../../types/Types';

// Components
import TextElement from '../resuable/TextElement';

// Style
import Colors from '../../assets/design/palette.json';
import FastImage from 'react-native-fast-image';

interface ChatMessagePropsType {
  item: ChatMessageType;
  userSocketId: string;
  index: number;
  onPlay(): void;
}

const ChatMessage: React.FC<ChatMessagePropsType> = ({
  item,
  userSocketId,
  index,
  onPlay,
}) => {
  const isShare = item.preview;
  const isSender = userSocketId === item.sender;

  if (isShare) {
    return (
      <Animated.View
        entering={FadeInLeft.delay(index * 100).springify()}
        style={[
          styles.messageContainer,
          styles.shareContainer,
          {
            backgroundColor: isSender ? Colors.active : Colors.secondary,
            alignSelf: isSender ? 'flex-start' : 'flex-end',
          },
        ]}>
        <TouchableOpacity onPress={onPlay} style={styles.imageContainer}>
          <FastImage
            source={{uri: item.image}}
            resizeMode={'cover'}
            style={styles.image}
          />
          <TextElement
            fontWeight={'bold'}
            fontSize={'sm'}
            cStyle={{color: Colors['gradient--modal-start']}}>
            Play Now!
          </TextElement>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TextElement cStyle={styles.black}>{item.message}</TextElement>
          <TextElement cStyle={styles.black} fontWeight={'bold'}>
            {`${item.title} - ${item.artist}`}
          </TextElement>
          <TextElement
            fontSize={'sm'}
            fontWeight={'bold'}
            cStyle={styles.black}>
            {item.timestamp}
          </TextElement>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeInLeft.delay(index * 100).springify()}
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
    maxWidth: '85%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  black: {
    color: Colors.black,
  },
  imageContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 65,
    backgroundColor: Colors.black,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default ChatMessage;

import React from 'react';
import {ScrollView} from 'react-native';
import {FloatingPlayerInstance} from '../../models/FloatingPlayerInstance';
import {ChatMessageType} from '../../types/Types';
import {initSoundTrack} from '../../utils/soundTracker';

// Components
import ChatMessage from './ChatMessage';

interface ChainChatPropsType {
  messagesList: ChatMessageType[];
  userSocketId: string;
}

const ChainChat: React.FC<ChainChatPropsType> = ({
  messagesList,
  userSocketId,
}) => {
  const onPlay = (item: ChatMessageType) => {
    const createFloatingTrack = new FloatingPlayerInstance(
      item.id.toString(),
      item.title!,
      item.artist!,
      item.image!,
      item.preview!,
    );
    initSoundTrack(item.preview!, [createFloatingTrack], createFloatingTrack);
  };

  return (
    <ScrollView>
      {messagesList.map((item, index) => (
        <ChatMessage
          key={item.id}
          item={item}
          userSocketId={userSocketId}
          index={index}
          onPlay={onPlay.bind(this, item)}
        />
      ))}
    </ScrollView>
  );
};

export default ChainChat;

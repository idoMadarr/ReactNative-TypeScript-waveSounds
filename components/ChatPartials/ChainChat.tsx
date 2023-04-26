import React from 'react';
import {ScrollView} from 'react-native';
import {ChatMessageType} from '../../types/Types';

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
  return (
    <ScrollView>
      {messagesList.map((item, index) => (
        <ChatMessage
          key={item.id}
          item={item}
          userSocketId={userSocketId}
          index={index}
        />
      ))}
    </ScrollView>
  );
};

export default ChainChat;

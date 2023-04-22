import React from 'react';
import {FlatList} from 'react-native';
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
    <FlatList
      data={messagesList}
      keyExtractor={itemData => itemData.id}
      renderItem={({item, index}) => (
        <ChatMessage item={item} userSocketId={userSocketId} index={index} />
      )}
    />
  );
};

export default ChainChat;

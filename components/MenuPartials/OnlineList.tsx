import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';
import {ConnectedOnlineType} from '../../types/Types';
import {PropDimensions} from '../../dimensions/dimensions';

// Components
import OnlineItem from './OnlineItem';
import TextElement from '../resuable/TextElement';

const OnlineList = () => {
  const onlines = useAppSelector(state => state.authSlice.onlines);

  const navigation = useNavigation();

  const defaultUser: ConnectedOnlineType = {
    userId: Math.random(),
    username: 'Yossi Madar',
    online: false,
    socketAddress: 'asd12a3a1s5d6',
  };

  const list: ConnectedOnlineType[] = [defaultUser];
  for (const online in onlines) {
    list.push({...onlines[online], socketAddress: online});
  }

  const chatNavigate = (user: ConnectedOnlineType) => {
    // @ts-ignore:
    navigation.navigate('chat', {user});
  };

  return (
    <ScrollView style={styles.onlineList}>
      <TextElement>{`${list.length} Onlines user:`}</TextElement>
      {list.map(user => (
        <OnlineItem
          key={user.userId}
          user={user}
          onChat={chatNavigate.bind(this, user)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  onlineList: {
    minHeight: '50%',
    width: PropDimensions.favoriteHeaderWidth,
    marginTop: 16,
  },
});

export default OnlineList;

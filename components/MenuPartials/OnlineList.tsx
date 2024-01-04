import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {PropDimensions} from '../../dimensions/dimensions';
import {navigate} from '../../utils/rootNavigation';

// Components
import OnlineItem from './OnlineItem';

const defaultUser = [
  {
    id: Math.random().toString(),
    email: 'idox3x@gmail.com',
    username: 'Ido Madar',
    socketId: null,
  },
];

const OnlineList = () => {
  const onlines = useAppSelector(state => state.authSlice.onlines);
  const currentUser = useAppSelector(state => state.authSlice.user);

  const chatNavigate = (onlineUser: any) => {
    navigate('main', {screen: 'chat', user: onlineUser});
  };

  const displayOnlines = onlines.length > 1 ? onlines : defaultUser;

  return (
    <ScrollView style={styles.onlineList}>
      {displayOnlines.map(onlineUser => {
        if (onlineUser.email === currentUser.email) return;

        return (
          <OnlineItem
            key={onlineUser.email}
            user={onlineUser}
            onChat={chatNavigate.bind(this, onlineUser)}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  onlineList: {
    alignSelf: 'center',
    width: PropDimensions.favoriteHeaderWidth,
    marginTop: 16,
  },
});

export default OnlineList;

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {PropDimensions} from '../../dimensions/dimensions';
import {ConnectedOnlineType} from '../../types/Types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../assets/design/palette.json';

// Components
import TextElement from '../resuable/TextElement';

interface OnlineUserPropsType {
  user: ConnectedOnlineType;
  onChat(): void;
}

const OnlineItem: React.FC<OnlineUserPropsType> = ({user, onChat}) => {
  const TocuableType = user.socketId ? TouchableOpacity : (View as any);

  return (
    <TocuableType onPress={onChat} style={[styles.container, {}]}>
      <View style={styles.left}>
        <TextElement cStyle={user.socketId ? styles.white : styles.offline}>
          {user.username}
        </TextElement>
        <TextElement
          fontSize={'sm'}
          fontWeight={'bold'}
          cStyle={user.socketId ? styles.active : styles.offline}>
          {user.socketId ? 'Active' : 'Offline'}
        </TextElement>
      </View>
      <View style={styles.right}>
        <Icon name={'comments'} size={22} color={Colors.secondary} />
      </View>
    </TocuableType>
  );
};

const styles = StyleSheet.create({
  container: {
    height: PropDimensions.favoriteHeight,
    flexDirection: 'row',
    paddingHorizontal: '6%',
    marginVertical: 2,
    borderRadius: 5,
    backgroundColor: Colors['gradient-start'],
  },
  left: {
    width: '80%',
    justifyContent: 'center',
  },
  right: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  active: {
    color: Colors.active,
  },
  offline: {
    color: Colors.placeholder,
  },
  white: {
    color: Colors.white,
  },
});

export default OnlineItem;

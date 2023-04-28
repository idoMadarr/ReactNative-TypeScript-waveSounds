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
  const isActive = user.online;

  const TocuableType = isActive ? TouchableOpacity : (View as any);

  return (
    <TocuableType onPress={onChat} style={[styles.container]}>
      <View style={styles.left}>
        <TextElement>{user.username}</TextElement>
        <TextElement
          fontSize={'sm'}
          fontWeight={'bold'}
          cStyle={{color: isActive ? Colors.active : Colors.placeholder}}>
          {isActive ? 'Active now!' : 'Offline'}
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
    paddingHorizontal: 8,
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
});

export default OnlineItem;

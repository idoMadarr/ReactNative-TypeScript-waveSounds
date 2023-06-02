import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import Lottie from 'lottie-react-native';

// Components
import TextElement from '../resuable/TextElement';

interface ChatHeaderPropsType {
  recipient: string;
  goBack(): void;
}

const ChatHeader: React.FC<ChatHeaderPropsType> = ({recipient, goBack}) => {
  return (
    <Animated.View entering={FadeInRight} style={styles.container}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={goBack} style={styles.icon}>
          <Icon name={'angle-left'} size={32} color={Colors.secondary} />
        </TouchableOpacity>
        <View>
          <TextElement>{`Starting chat with ${recipient}`}</TextElement>
          <TextElement fontSize={'sm'}>Online</TextElement>
        </View>
      </View>
      <Lottie
        source={require('../../assets/lottie/chat.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: PropDimensions.chatHeaderHeight,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 16,
  },
  lottie: {
    width: 50,
    height: 50,
  },
});

export default ChatHeader;

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {useDrawerStatus} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {FadeInUp} from 'react-native-reanimated';

// Components
import TextElement from './resuable/TextElement';

const MenuDrawer = () => {
  const isOpen = useDrawerStatus() === 'open';

  return (
    <LinearGradient
      colors={[Colors['gradient--modal-start'], Colors['gradient-modal-end']]}
      style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Icon
          name={'user-circle-o'}
          size={58}
          color={Colors.active}
          style={{marginBottom: 8}}
        />
        <TextElement cStyle={{color: Colors.white}}>
          * Idox2x@Gmail.com *
        </TextElement>
        <TextElement
          fontSize={'sm'}
          fontWeight={'bold'}
          cStyle={{color: Colors.white}}>
          Check your favorites tracks:
        </TextElement>
      </View>
      {isOpen && (
        <View>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => (
            <Animated.View
              key={i}
              entering={FadeInUp.delay(100 * index).springify()}>
              <TouchableOpacity
                style={{
                  borderBottomWidth: 1,
                  marginHorizontal: 12,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderColor: Colors.secondary,
                }}>
                <TextElement cStyle={{color: Colors.white}}>Test</TextElement>
                <Icon name={'play'} size={18} color={Colors.secondary} />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  drawerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.2,
  },
});

export default MenuDrawer;

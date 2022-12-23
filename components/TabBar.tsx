import React from 'react';
import {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {PropDimensions} from '../dimensions/dimensions';
import Colors from '../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import {tabs} from '../fixtures/tabs.json';

const DEFAULT = tabs[1].route;

interface TabType {
  id: number;
  route: string;
  icon: string;
  focus: string;
  setFocus: any;
}

const TabBar: React.FC = () => {
  const [focus, setFocus] = useState(DEFAULT);
  const offset = useSharedValue(0);
  const navigation = useNavigation();

  const translateXAnimate = (route: string, index: number) => {
    setFocus(route);
    offset.value = setTranslateX(index);
    navigation.navigate(route as never);
  };

  const setTranslateX = (index: number) => {
    return (PropDimensions.fullWidth / 3) * index;
  };

  const offsetAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(offset.value)}],
    };
  });

  return (
    <LinearGradient
      style={styles.tabContainer}
      colors={[
        Colors['gradient-mid'],
        Colors['gradient-start'],
        Colors['gradient-end'],
      ]}>
      {tabs.map(({id, route, icon}) => (
        <Tab
          key={id}
          id={id}
          route={route}
          icon={icon}
          focus={focus}
          setFocus={translateXAnimate}
        />
      ))}
      <Animated.View style={[offsetAnimation, styles.indicator]} />
    </LinearGradient>
  );
};

const Tab: React.FC<TabType> = ({id, route, icon, focus, setFocus}) => {
  const scale = useSharedValue(1);
  const isFocus = route === focus;

  const scaleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(scale.value)}],
    };
  });

  useEffect(() => {
    if (!isFocus) scale.value = 1;
  }, [focus]);

  const onPress = (route: string) => {
    setFocus(route, id);
    scale.value = 1.4;
  };

  return (
    <Animated.View style={scaleAnimation}>
      <TouchableOpacity onPress={onPress.bind(this, route)}>
        <Icon
          name={icon}
          size={22}
          color={isFocus ? Colors.active : Colors.secondary}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 50,
    alignSelf: 'center',
    width: PropDimensions.fullWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    borderRadius: 25,
    height: 2,
    backgroundColor: Colors.active,
    left: PropDimensions.tabWidth * 0.1,
    width: PropDimensions.tabWidth / 7.0,
  },
});

export default TabBar;

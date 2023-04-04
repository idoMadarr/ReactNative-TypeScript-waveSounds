import React from 'react';
import {useEffect, useState} from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {cleanFloatingPlayer} from '../redux/slices/deezerSlice';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PropDimensions} from '../dimensions/dimensions';
import Colors from '../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import {tabs} from '../fixtures/tabs.json';

const DEFAULT_TAB = tabs[1].route;
const DEFAULT_OFFSET = PropDimensions.fullWidth / 4;

interface TabType {
  id: number;
  route: string;
  icon: string;
  focus: string;
  setFocus: Function;
}

const TabBar: React.FC = () => {
  const [focus, setFocus] = useState(DEFAULT_TAB);
  const offset = useSharedValue(DEFAULT_OFFSET);
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const translateXAnimate = (route: string, index: number) => {
    if (route === 'menu') {
      dispatch(cleanFloatingPlayer());
      return navigation.openDrawer();
    }
    setFocus(route);
    offset.value = setTranslateX(index);
    navigation.navigate(route as never);
  };

  const setTranslateX = (index: number) => {
    return (PropDimensions.fullWidth / 4) * index;
  };

  const offsetAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(offset.value)}],
    };
  });

  return (
    <View style={styles.tabContainer}>
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
      {/* <Animated.View style={[offsetAnimation, styles.indicator]} /> */}
    </View>
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
    if (route !== 'menu') scale.value = 1.4;
  };

  return (
    <Animated.View style={scaleAnimation}>
      <TouchableOpacity style={styles.tab} onPress={onPress.bind(this, route)}>
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
    backgroundColor: Colors['gradient-start'],
    elevation: 5,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
  },
  indicator: {
    width: 50,
    position: 'absolute',
    top: 0,
    left: (PropDimensions.tabWidth * 0.33 - 50) / 2,
    borderRadius: 25,
    height: 2,
    backgroundColor: Colors.active,
  },
});

export default TabBar;

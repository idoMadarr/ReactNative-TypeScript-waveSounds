import React, {Fragment} from 'react';
import {useEffect, useState} from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PropDimensions} from '../dimensions/dimensions';
import {tabs} from '../fixtures/tabs.json';
import TextElement from './resuable/TextElement';
import FaviconVector from '../assets/vectors/waveSounds-favicon.svg';
import ProfileIcon from '../assets/vectors/profile.svg';
import SearchIcon from '../assets/vectors/search.svg';
import SettingIcon from '../assets/vectors/setting.svg';
import StarIcon from '../assets/vectors/star.svg';
import Colors from '../assets/design/palette.json';

const iconList = [
  <SearchIcon />,
  <ProfileIcon />,
  null,
  <StarIcon />,
  <SettingIcon />,
];

const DEFAULT_TAB = tabs[1].route;
const DEFAULT_OFFSET = PropDimensions.fullWidth / 2.56;

interface TabType {
  id: number;
  route: string;
  focus: string;
  setFocus: Function;
}

const TabBar: React.FC = () => {
  const [focus, setFocus] = useState(DEFAULT_TAB);
  const offset = useSharedValue(DEFAULT_OFFSET);
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const translateXAnimate = (route: string, index: number) => {
    setFocus(route);
    offset.value = setTranslateX(index);
    navigation.navigate(route as never);
  };

  const setTranslateX = (index: number) => {
    return (PropDimensions.fullWidth / 5) * index;
  };

  const offsetAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(offset.value)}],
    };
  });

  return (
    <View style={styles.tabContainer}>
      {tabs.map(({id, route}) => (
        <Tab
          key={id}
          id={id}
          route={route}
          focus={focus}
          setFocus={translateXAnimate}
        />
      ))}
      <Animated.View style={[offsetAnimation, styles.indicator]} />
    </View>
  );
};

const Tab: React.FC<TabType> = ({id, route, focus, setFocus}) => {
  const scale = useSharedValue(1);
  const isFocus = route === focus;

  const scaleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(scale.value)}],
      color: isFocus ? Colors.active : Colors.secondary,
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
    <TouchableOpacity onPress={onPress.bind(this, route)} style={styles.tab}>
      {route !== 'home' ? (
        <Fragment>
          <Animated.View style={scaleAnimation}>{iconList[id]}</Animated.View>
          <TextElement
            fontSize={'sm'}
            cStyle={{marginTop: 2, color: Colors.placeholder}}>
            {`${route[0].toUpperCase()} ${route.slice(1)}`}
          </TextElement>
        </Fragment>
      ) : (
        <View style={{paddingBottom: 8}}>
          <FaviconVector height={80} width={80} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 80,
    alignSelf: 'center',
    width: PropDimensions.fullWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: '2%',
    width: '20%',
  },
  indicator: {
    width: 50,
    position: 'absolute',
    top: 0,
    left: (PropDimensions.tabWidth * 0.2 - 50) / 2,
    borderRadius: 25,
    height: 2,
    backgroundColor: Colors.active,
  },
});

export default TabBar;

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStack} from './StackNavigation';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabBar from '../components/TabBar';
import CommunityScreen from '../screens/CommunityScreen';

const TabNavigation = () => {
  const TabNavigator = createBottomTabNavigator();

  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={() => <TabBar />}>
      <TabNavigator.Screen name={'main'} component={MainStack} />
      <TabNavigator.Screen name={'search'} component={SearchScreen} />
      <TabNavigator.Screen name={'favorites'} component={FavoritesScreen} />
      <TabNavigator.Screen name={'profile'} component={ProfileScreen} />
      <TabNavigator.Screen name={'community'} component={CommunityScreen} />
    </TabNavigator.Navigator>
  );
};

export default TabNavigation;

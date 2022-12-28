import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStack} from './StackNavigation';
import SearchScreen from '../screens/SearchScreen';
import TabBar from '../components/TabBar';

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
    </TabNavigator.Navigator>
  );
};

export default TabNavigation;

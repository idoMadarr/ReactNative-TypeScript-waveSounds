import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import MenuDrawer from '../components/MenuDrawer';

const DrawerNavigation = () => {
  const DrawerNavigator = createDrawerNavigator();

  return (
    <DrawerNavigator.Navigator
      drawerContent={() => <MenuDrawer />}
      screenOptions={{
        // drawerType: 'slide',
        headerShown: false,
        drawerStyle: {width: '60%'},
        drawerPosition: 'left',
        swipeEdgeWidth: 0,
      }}>
      <DrawerNavigator.Screen name={'tabs'} component={TabNavigation} />
    </DrawerNavigator.Navigator>
  );
};

export default DrawerNavigation;

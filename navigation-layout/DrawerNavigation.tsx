import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import MenuDrawer from '../components/MenuDrawer';
import Colors from '../assets/design/palette.json';

const DrawerNavigation = () => {
  const DrawerNavigator = createDrawerNavigator();

  return (
    <DrawerNavigator.Navigator
      drawerContent={() => <MenuDrawer />}
      screenOptions={{
        drawerType: 'slide',
        headerShown: false,
        drawerStyle: {width: '100%'},
        drawerPosition: 'left',
        overlayColor: Colors.transparent,
        swipeEdgeWidth: 0,
      }}>
      <DrawerNavigator.Screen name={'tabs'} component={TabNavigation} />
    </DrawerNavigator.Navigator>
  );
};

export default DrawerNavigation;

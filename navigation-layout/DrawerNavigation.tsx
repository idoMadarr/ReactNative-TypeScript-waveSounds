import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import Colors from '../assets/design/palette.json';
// import MenuDrawerScreen from '../screens/MenuDrawerScreen';

const DrawerNavigation = () => {
  const DrawerNavigator = createDrawerNavigator();

  return (
    <DrawerNavigator.Navigator
      // drawerContent={() => <MenuDrawerScreen />}
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

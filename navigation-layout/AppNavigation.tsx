import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '../redux/hooks';

// Screens
import TabNavigation from './TabNavigation';
import LoadingScreen from '../screens/LoadingScreen';
import MiniPlayer from '../components/MiniPlayer';
import {View} from 'react-native';

const AppNavigation: React.FC = () => {
  const AppNavigator = createNativeStackNavigator();
  const miniPlayer = useAppSelector(state => state.deezerSlice.miniPlayer);

  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        {miniPlayer.active && <MiniPlayer />}
        <AppNavigator.Navigator screenOptions={{headerShown: false}}>
          <AppNavigator.Screen name={'init'} component={LoadingScreen} />
          <AppNavigator.Group>
            <AppNavigator.Screen name={'tabs'} component={TabNavigation} />
          </AppNavigator.Group>
        </AppNavigator.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppNavigation;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import TabNavigation from './TabNavigation';
import LoadingScreen from '../screens/LoadingScreen';

const AppNavigation: React.FC = () => {
  const AppNavigator = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{headerShown: false}}>
        <AppNavigator.Screen name={'init'} component={LoadingScreen} />
        <AppNavigator.Group>
          <AppNavigator.Screen name={'tabs'} component={TabNavigation} />
        </AppNavigator.Group>
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

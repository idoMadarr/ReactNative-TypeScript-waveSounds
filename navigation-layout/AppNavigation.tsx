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
      <AppNavigator.Navigator>
        <AppNavigator.Screen
          name={'init'}
          component={LoadingScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Group>
          <AppNavigator.Screen
            name={'tabs'}
            component={TabNavigation}
            options={{headerShown: false}}
          />
        </AppNavigator.Group>
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

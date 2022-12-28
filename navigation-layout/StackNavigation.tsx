import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AlbumScreen from '../screens/AlbumScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

export const MainStack = () => {
  const MainStack = createNativeStackNavigator();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'home'}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name={'album'}
        component={AlbumScreen}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

export const AuthStack = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={'sign-in'} component={FavoritesScreen} />
    </AuthStack.Navigator>
  );
};

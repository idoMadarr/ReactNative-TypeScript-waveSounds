import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AlbumScreen from '../screens/AlbumScreen';
import ChatScreen from '../screens/ChatScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

export const MainStack = () => {
  const MainStack = createNativeStackNavigator();

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name={'home'} component={HomeScreen} />
      <MainStack.Screen name={'album'} component={AlbumScreen} />
      <MainStack.Screen name={'chat'} component={ChatScreen} />
    </MainStack.Navigator>
  );
};

export const AuthStack = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={'sign-in'} component={SignInScreen} />
      <AuthStack.Screen name={'sign-up'} component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AlbumScreen from '../screens/AlbumScreen';

const MainStack = () => {
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

export default MainStack;

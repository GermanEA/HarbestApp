import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import SplashScreen from 'react-native-splash-screen';

import { HomeScreen } from '../screens/HomeScreen';

export type RootStackParams = {
  HomeScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {

  useEffect(() => {
    SplashScreen.hide();    
  }, [])

  const optionsNavigator: StackNavigationOptions = {
    headerShown: false
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={ optionsNavigator }       
      >
        {           
            <>
                <Stack.Screen name="HomeScreen" component={ HomeScreen } />                 
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
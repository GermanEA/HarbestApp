import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import SplashScreen from 'react-native-splash-screen';

import { HomeScreen } from '../screens/HomeScreen';
import { CameraBarCode } from '../screens/camera/CameraBarCode';
import { Product } from '../context/api/apiInterfaces';
import { ProductDetailsScreen } from '../screens/product/ProductDetailsScreen';

export type RootStackParams = {
  HomeScreen: undefined,
  ProductDetailsScreen: { product: Product },
  CameraBarCode: undefined
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
                <Stack.Screen name="ProductDetailsScreen" component={ ProductDetailsScreen } />                
                <Stack.Screen name="CameraBarCode" component={ CameraBarCode } />                 
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
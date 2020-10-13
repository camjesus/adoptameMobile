import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../views/Login';
import Cuenta from '../views/Cuenta';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cuenta"
        component={Cuenta}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

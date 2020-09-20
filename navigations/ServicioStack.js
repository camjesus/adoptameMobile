import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Servicios from '../views/Servicios';

const Stack = createStackNavigator();

export default function ServicioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="servicios"
        component={Servicios}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

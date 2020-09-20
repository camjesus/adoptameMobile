import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Filtros from '../views/Filtros';
import Disponibles from '../views/Disponibles';

const Stack = createStackNavigator();

export default function BuscarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Disponibles"
        component={Disponibles}
        options={{title: 'Adoptame'}}
      />
      <Stack.Screen
        name="filtros"
        component={Filtros}
        options={{title: 'Filtros'}}
      />
    </Stack.Navigator>
  );
}

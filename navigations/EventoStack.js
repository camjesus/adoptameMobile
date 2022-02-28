import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Eventos from '../views/Eventos';

const Stack = createStackNavigator();

export default function EventoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Eventos"
        component={Eventos}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

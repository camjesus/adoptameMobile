import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MisMascotas from '../views/MisMascotas';
import VerMascota from '../views/VerMascota';
import CrearMascota from '../views/CrearMascota';

const Stack = createStackNavigator();

export default function MisMascotasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="misMascotas"
        component={MisMascotas}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="verMascota"
        component={VerMascota}
        options={{htitle: 'Mi mascota'}}
      />
      <Stack.Screen
        name="crearMascota"
        component={CrearMascota}
        options={{title: 'Nueva mascota'}}
      />
    </Stack.Navigator>
  );
}

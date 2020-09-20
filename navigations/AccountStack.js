import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../views/Login';
import Cuenta from '../views/Cuenta';
import CrearUsuario from '../views/CrearUsuario';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="cuenta"
        component={Cuenta}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="crearUsuario"
        component={CrearUsuario}
        options={{title: 'Nueva usuario'}}
      />
    </Stack.Navigator>
  );
}

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../views/Login';
import Cuenta from '../views/Cuenta';
import CrearUsuario from '../views/CrearUsuario';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    accent: '#252932',
    backdrop: 'transparent',
    background: '#9575cd',
    disabled: 'rgba(0, 0, 0, 0.90)',
    error: '#B00020',
    notification: '#f50057',
    onBackground: '#252932',
    onSurface: '#252932',
    placeholder: '#252932',
    primary: '#252932',
    surface: '#252932',
    text: '#252932',
  },
};

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CrearUsuario"
          component={CrearUsuario}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}

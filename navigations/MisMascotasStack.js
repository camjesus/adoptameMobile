import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MisMascotas from '../views/MisMascotas';
import VerMapa from '../views/VerMapa';
import CrearMascota from '../views/CrearMascota';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    accent: '#ff9d4e',
    backdrop: 'rgba(192,192,192,0.3)',
    background: '#252932',
    disabled: 'rgba(0, 0, 0, 0.26)',
    error: '#B00020',
    notification: '#f50057',
    onBackground: '#252932',
    onSurface: '#ffffff',
    placeholder: '#ffffff',
    primary: '#ff9d4e',
    surface: '#ff9d4e',
    text: '#ffffff',
  },
};
export default function MisMascotasStack() {
  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.text,
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="misMascotas"
          component={MisMascotas}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="crearMascota"
          component={CrearMascota}
          options={{title: 'Nueva mascota'}}
        />
        <Stack.Screen
          name="verMapa"
          component={VerMapa}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}

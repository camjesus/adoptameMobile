import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MisMascotas from '../views/MisMascotas';
import VerMapa from '../views/VerMapa';
import CrearMascota from '../views/CrearMascota';
import EstadosAdopcion from '../views/EstadosAdopcion';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    accent: 'transparent',
    backdrop: 'transparent',
    background: '#FFAD00',
    disabled: 'rgba(0, 0, 0, 0.26)',
    error: '#B00020',
    notification: '#FFAD00',
    onBackground: '#252932',
    onSurface: '#252932',
    placeholder: '#252932',
    primary: '#D0800A',
    surface: '#252932',
    text: '#252932',
  },
  animation: {
    scale: 'transparent',
  },
};
export default function MisMascotasStack() {
  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="misMascotas"
          component={MisMascotas}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="crearMascota"
          component={CrearMascota}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="verMapa"
          component={VerMapa}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="EstadosAdopcion"
          component={EstadosAdopcion}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}

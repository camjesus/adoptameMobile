import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Filtros from '../views/Filtros';
import Disponibles from '../views/Disponibles';
import Login from '../views/Login';
import Cuenta from '../views/Cuenta';
import CrearUsuario from '../views/CrearUsuario';
import DetalleMascota from '../views/DetalleMascota';
import Denunciar from '../views/Denunciar';
import ChatScreen from '../views/ChatScreen';
import ChatScreenTest from '../views/ChatScreenTest';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    accent: '#252932',
    backdrop: 'transparent',
    background: '#FFAD00',
    disabled: 'rgba(0, 0, 0, 0.90)',
    error: '#B00020',
    notification: '#f50057',
    onBackground: '#252932',
    onSurface: '#252932',
    placeholder: '#252932',
    primary: '#252932',
    surface: '#FFFFFF',
    text: '#252932',
  },
};

export default function BuscarStack() {
  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Disponibles"
          component={Disponibles}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="filtros"
          component={Filtros}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, swipeEnabled: false}}
        />
        <Stack.Screen
          name="cuenta"
          component={Cuenta}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CrearUsuario"
          component={CrearUsuario}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetalleMascota"
          component={DetalleMascota}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Denunciar"
          component={Denunciar}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}

//options={({navigation, route}) => ({
//  title: 'Adoptame',
//  headerTitleAlign: 'center',
//  headerRight: (props) => (
//    <BarraFiltro {...props} navigation={navigation} route={route} />
//  ),
//})}

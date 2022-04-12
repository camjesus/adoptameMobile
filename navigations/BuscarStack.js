import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Filtros from '../views/Filtros';
import Home from '../views/Home';
import Login from '../views/Login';
import Cuenta from '../views/Cuenta';
import CrearUsuario from '../views/CrearUsuario';
import DetalleMascota from '../views/DetalleMascota';
import Denunciar from '../views/Denunciar';
import ChatScreen from '../views/ChatScreen';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();
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
    surface: '#FFFFFF',
    text: '#252932',
  },
};

export default function BuscarStack() {
  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="filtros"
          component={Filtros}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="cuenta"
          component={Cuenta}
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

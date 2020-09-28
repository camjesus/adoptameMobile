import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MisMascotasStack from './MisMascotasStack';
import EventoStack from './EventoStack';
import ServicioStack from './ServicioStack';
import BuscarStack from './BuscarStack';
import AccountStack from './AccountStack';

import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
      <Tab.Navigator
        initialRouteName="account"
        tabBarOptions={{
          inactiveTintColor: '#646464',
          activeTintColor: '#00a680',
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}>
        <Tab.Screen
          name="misMascotas"
          component={MisMascotasStack}
          options={{ title: 'Mis Mascotas' }}
        />

        <Tab.Screen
          name="eventos"
          component={EventoStack}
          options={{ title: 'Eventos' }}
        />

        <Tab.Screen
          name="serivcios"
          component={ServicioStack}
          options={{ title: 'Serivcios' }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: 'Cuenta' }}
        />
        <Tab.Screen
          name="buscar"
          component={BuscarStack}
          options={{ title: 'Buscar' }}
        />
      </Tab.Navigator>


  );
}

function screenOptions(route, color) {
  let iconName;
  console.log(route);
  switch (route.name) {
    case 'misMascotas':
      iconName = 'paw';
      break;
    case 'serivcios':
      iconName = 'hospital';
      break;
    case 'eventos':
      iconName = 'calendar-multiple';
      break;
    case 'account':
      iconName = 'account';
      break;
    case 'buscar':
      iconName = 'magnify';
      break;

    default:
      break;
  }
  return <Maticons name={iconName} size={22} color={color} />;
}

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MisMascotasStack from '../navigations/MisMascotasStack';
import Eventos from '../views/Eventos';
import Serivcios from '../views/Servicios';
import Filtros from '../views/Filtros';
import Cuenta from '../views/Cuenta';

import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function Navigation({navigation, route}) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="MisMascotasStack"
        tabBarOptions={{
          inactiveTintColor: '#646464',
          activeTintColor: '#00a680',
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => screenOptions(route, color),
        })}>
        <Tab.Screen
          name="misMascotas"
          component={MisMascotasStack}
          options={{title: 'Mis Mascotas'}}
        />

        <Tab.Screen
          name="eventos"
          component={Eventos}
          options={{title: 'Eventos'}}
        />

        <Tab.Screen
          name="serivcios"
          component={Serivcios}
          options={{title: 'Serivcios'}}
        />
        <Tab.Screen
          name="cuenta"
          component={Cuenta}
          options={{title: 'Cuenta'}}
        />
        <Tab.Screen
          name="buscar"
          component={Filtros}
          options={{title: 'Buscar'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
    case 'cuenta':
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

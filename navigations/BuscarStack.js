import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Filtros from '../views/Filtros';
import Disponibles from '../views/Disponibles';
import BarraFiltro from '../components/ui/BarraFiltro';

const Stack = createStackNavigator();

export default function BuscarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Disponibles"
        component={Disponibles}
        options={({navigation, route}) => ({
          title: 'Adoptame',
          headerTitleAlign: 'center',
          headerRight: (props) => (
            <BarraFiltro onpress='' />
          ),
        })}
      />
      <Stack.Screen
        name="filtros"
        component={Filtros}
        options={{title: 'Filtros'}}
      />
    </Stack.Navigator>
  );
}

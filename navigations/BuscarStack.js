import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Filtros from '../views/Filtros';
import Disponibles from '../views/Disponibles';
import BarraFiltro from '../components/ui/BarraFiltro';
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
    surface: '#252932',
    text: '#ffffff',
  },
};
export default function BuscarStack() {
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
          name="Disponibles"
          component={Disponibles}
          options={({navigation, route}) => ({
            title: 'Adoptame',
            headerTitleAlign: 'center',
            headerRight: (props) => (
              <BarraFiltro {...props} navigation={navigation} route={route} />
            ),
            headerLeft: false,
          })}
        />
        <Stack.Screen
          name="filtros"
          component={Filtros}
          options={{title: 'Filtros'}}
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

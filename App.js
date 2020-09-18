import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Inicio from './views/Inicio';
import Login from './views/Login';
import CrearUsuario from './views/CrearUsuario';
import DetallesCliente from './views/DetallesCliente';
import Menu from './views/Menu';
import Eventos from './views/Eventos';
import Servicios from './views/Servicios';
import Disponibles from './views/Disponibles';
import BarraSuperior from './components/ui/BarraSuperior';
import BarraFiltro from './components/ui/BarraFiltro';
import Filtros from './views/Filtros';
import CrearMascota from './views/CrearMascota';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Strack = createStackNavigator();

//Defino el tema

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    prymary: '#177472',
    accent: '#0655BF',
  },
};

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Strack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Strack.Screen
              name="Inicio"
              component={Inicio}
              options={{headerShown: false}}
            />
            <Strack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Strack.Screen
              name="CrearUsuario"
              component={CrearUsuario}
              options={{
                title: 'Nueva cuenta',
                headerTitleAlign: 'center',
              }}
            />
            <Strack.Screen
              name="DetallesCliente"
              component={DetallesCliente}
              options={{
                title: 'Detalles Cliente',
                headerTitleAlign: 'center',
              }}
            />

            <Strack.Screen
              name="Menu"
              component={Menu}
              options={{headerShown: false}}
            />
            <Strack.Screen name="Eventos" component={Eventos} />
            <Strack.Screen
              name="Disponibles"
              component={Disponibles}
              options={({navigation, route}) => ({
                title: 'Adoptame',
                headerTitleAlign: 'center',
                headerLeft: (props) => (
                  <BarraSuperior
                    {...props}
                    navigation={navigation}
                    route={route}
                  />
                ),
                headerRight: (props) => (
                  <BarraFiltro
                    {...props}
                    navigation={navigation}
                    route={route}
                  />
                ),
              })}
            />
            <Strack.Screen name="Servicios" component={Servicios} />
            <Strack.Screen name="CrearMascota" component={CrearMascota} />

            <Strack.Screen name="Filtros" component={Filtros} />
          </Strack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;

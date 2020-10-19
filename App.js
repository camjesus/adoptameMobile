import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './views/Login';
import Menu from './views/Menu';
import CrearUsuario from './views/CrearUsuario';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Navigation from './navigations/Navigation';

const Strack = createStackNavigator();

//Defino el tema

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
const App = () => {
  console.log(theme);
  console.log(DefaultTheme);

  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Strack.Navigator
            initialRouteName="Login"
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
            <Strack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Strack.Screen
              name="Menu"
              component={Navigation}
              options={{headerShown: false}}
            />
            <Strack.Screen
              name="crearUsuario"
              component={CrearUsuario}
              options={{title: 'Nuevo usuario'}}
            />
          </Strack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;

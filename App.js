import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './views/Login';
import Menu from './views/Menu';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Navigation from './navigations/Navigation';

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
            initialRouteName="Login"
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
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Strack.Screen
              name="Menu"
              component={Navigation}
              options={{headerShown: false}}
            />
          </Strack.Navigator>
         
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;

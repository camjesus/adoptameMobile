import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './navigations/Navigation';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

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
        <Navigation />
      </PaperProvider>
    </>
  );
};

export default App;

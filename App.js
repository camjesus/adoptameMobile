import 'react-native-gesture-handler';
import React from 'react';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MisMascotasStack from './navigations/MisMascotasStack';
import BuscarStack from './navigations/BuscarStack';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';

const Drawer = createDrawerNavigator();
//Defino el tema

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    accent: '#252932',
    backdrop: 'transparent',
    background: '#FFAD00',
    disabled: 'rgba(0, 0, 0, 0.26)',
    error: '#B00020',
    notification: '#f50057',
    onBackground: '#252932',
    onSurface: '#252932',
    placeholder: '#252932',
    primary: '#252932',
    surface: '#252932',
    text: '#252932',
  },
};

function CustomDrawerContent(props) {
  const logOut = () => {
    eliminoStorage();
  };
  const eliminoStorage = async () => {
    try {
      console.log('borro del storage');

      await AsyncStorage.removeItem('nombre');
      await AsyncStorage.removeItem('apellido');
      await AsyncStorage.removeItem('email');

      await AsyncStorage.removeItem('userId').then((value) => {
        props.navigation.navigate('BuscarStack', {screen: 'Login'});
      });
    } catch (error) {
      console.log('error eliminando del storage' + error);
    }
  };

  return (
    <View>
      <View style={styles.viewLogo}>
        <Image source={require('./img/casita.png')} style={styles.imglogo} />
        <Text style={styles.adoptaMe}>Adopta.Me</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Mis Datos"
        activeTintColor="#FFAD00"
        labelStyle={{
          margin: 0,
          padding: 0,
          fontSize: 18, 
        }}
        icon={() => <Icon
            reverse
            size={22}
            name="account"
            type="material-community"
            color="#FFAD00"
          />}
        onPress={() =>
          props.navigation.navigate('BuscarStack', {screen: 'cuenta'})
        }
      />
      <DrawerItem
        label="Cerrar Sesión"
        activeTintColor="#FFAD00"
        labelStyle={{
          margin: 0,
          padding: 0,
          fontSize: 18, 
        }}
        icon={() => <Icon
            reverse
            size={22}
            name="power"
            type="material-community"
            color="#FFAD00"/>}
        onPress={() => logOut()}
      />
      </View>
  );
}
const App = (props, navigation) => {
  console.log(theme);
  console.log(DefaultTheme);
  console.log(props);

  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer style={styles.item} drawer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerStyle={{
              backgroundColor: '#FFFFFF',
              flex: 1,
              margin: 0,
              padding: 0,
            }}
            drawerContentOptions={{
              style: {
                marginVertical: 100,
              },
              activeTintColor: '#FFAD00',
              labelStyle: {
                margin: 0,
                padding: 0,
                fontSize: 18,
              },
            }}
            sceneContainerStyle={{
                margin: 0,
                padding: 0,
            }}
            initialRouteName="Login"
            drawerType={'front'}>
            <Drawer.Screen
              name="BuscarStack"
              component={BuscarStack}
              navigation={navigation}
              options={{
                drawerLabel: 'Buscar',
                drawerIcon: ({focused, size, color}) => (
                  <Icon
                    reverse
                    size={22}
                    name="magnify"
                    type="material-community"
                    color="#FFAD00"
                  />
                ),
            }}
            />
            <Drawer.Screen
              name="MisMascotasStack"
              component={MisMascotasStack}
              options={{
                drawerLabel: 'Mis Mascotas',
                drawerIcon: ({focused, size}) => (
                  <Icon
                    reverse
                    size={22}
                    name="paw"
                    type="material-community"
                    color="#FFAD00"
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  cardMenu: {
    padding: 0,
    margin: 0,
    backgroundColor: '#FFAD00',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {width: 1, height: 13},
  },
  viewLogo: {
    margin: 0,
    backgroundColor: '#FFAD00',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    flexDirection: 'row',
    height: 200,
    padding: 15,
  },
  imglogo: {
    width: '100%',
    height: '100%',
    flex: 2,
  },
  adoptaMe: {
    fontSize: 30,
    color: '#252932',
    fontFamily: 'ArchitectsDaughter-Regular',
    flex: 4,
    marginTop: 'auto',
    paddingTop: 50,
    paddingStart: 10,
    marginBottom: 'auto',
  },
  item: {
    margin: 0,
    padding: 0,
  },
});

export default App;

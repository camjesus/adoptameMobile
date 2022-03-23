import 'react-native-gesture-handler';
import React from 'react';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MisMascotasStack from './MisMascotasStack';
import BuscarStack from './BuscarStack';
import ChatsStack from './ChatsStack';
import EventoStack from './EventoStack';
import {useDispatch} from 'react-redux';
import {deleteStorage, checkUserID} from '../store/actions/auth.action';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();
//Defino el tema

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    accent: '#252932',
    backdrop: 'transparent',
    background: '#9575cd',
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
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(deleteStorage());
  };

  return (
    <View>
      <View style={styles.viewLogo}>
        <Image source={require('../img/casita_b.png')} style={styles.imglogo} />
        <Text style={styles.adoptaMe}>Portal Pet</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Mis Datos"
        activeTintColor="#9575cd"
        labelStyle={{
          margin: 0,
          padding: 0,
          fontSize: 18,
        }}
        icon={() => (
          <Icon
            reverse
            size={22}
            name="account"
            type="material-community"
            color="#9575cd"
          />
        )}
        onPress={() =>
          props.navigation.navigate('BuscarStack', {screen: 'cuenta'})
        }
      />
      <DrawerItem
        label="Cerrar Sesión"
        activeTintColor="#9575cd"
        labelStyle={{
          margin: 0,
          padding: 0,
          fontSize: 18,
        }}
        icon={() => (
          <Icon
            reverse
            size={22}
            name="power"
            type="material-community"
            color="#9575cd"
          />
        )}
        onPress={() => logOut()}
      />
    </View>
  );
}
const DrawerPortal = (props, navigation) => {
  console.log(theme);
  console.log(DefaultTheme);
  console.log(props);

  return (
    <>
      <PaperProvider theme={theme}>
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
            activeTintColor: '#9575cd',
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
          initialRouteName="Home"
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
                  color="#9575cd"
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
                  color="#9575cd"
                />
              ),
            }}
          />
          <Drawer.Screen
            name="ChatsStack"
            component={ChatsStack}
            options={{
              drawerLabel: 'Chats',
              drawerIcon: ({focused, size}) => (
                <Icon
                  reverse
                  size={22}
                  name="forum"
                  type="material-community"
                  color="#9575cd"
                />
              ),
            }}
          />
          <Drawer.Screen
            name="EventoStack"
            component={EventoStack}
            options={{
              drawerLabel: 'Eventos',
              drawerIcon: ({focused, size}) => (
                <Icon
                  reverse
                  size={22}
                  name="calendar-blank"
                  type="material-community"
                  color="#9575cd"
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  cardMenu: {
    padding: 0,
    margin: 0,
    backgroundColor: '#9575cd',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {width: 1, height: 13},
  },
  viewLogo: {
    backgroundColor: '#9575cd',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    elevation: 10,
    flexDirection: 'row',
    paddingBottom: 25,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  imglogo: {
    width: '100%',
    height: '100%',
    margin: 0,
    flex: 2,
  },
  adoptaMe: {
    fontSize: 30,
    color: '#252932',
    fontFamily: 'ArchitectsDaughter-Regular',
    flex: 5,
    paddingTop: 30,
    paddingStart: 10,
  },
  item: {
    margin: 0,
    padding: 0,
  },
});

export default DrawerPortal;

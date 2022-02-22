import React from 'react'
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {View, StyleSheet, Text} from 'react-native';
import {
    createDrawerNavigator,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

  const Drawer = createDrawerNavigator();

function DrawerPortal ({logOut})
{
  return(
    <View>
        <View style={styles.viewLogo}>
        <Image source={require('./img/casita_b.png')} style={styles.imglogo} />
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
        icon={() => <Icon
            reverse
            size={22}
            name="account"
            type="material-community"
            color="#9575cd"
            />}
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
        icon={() => <Icon
            reverse
            size={22}
            name="power"
            type="material-community"
            color="#9575cd"/>}
        onPress={() => logOut()}
        />
    </View>
  )
}
export default DrawerPortal;
import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const Inicio = ({navigation}) => {
  const irALogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={style.contenedor}>
      <Text>Bienvenido a Adoptame</Text>
      <Button title="Empezar" onPress={() => irALogin()} />
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Inicio;

import React, {useState} from 'react';
import {View, Picker} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Button from 'react-native-paper';

const Filtros = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const buscar = () => {
    //navigation.navigate('Disponibles');
  };
  return <View></View>;
};

export default Filtros;

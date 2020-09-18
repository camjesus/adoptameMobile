import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BarraFiltro = ({navigation}) => {
  const heandlePress = () => {
    navigation.navigate('Filtros');
  };
  return (
    <Button
      type="clear"
      onPress={() => heandlePress()}
      icon={<Icon name="filter" size={30} color="white" />}
    />
  );
};

export default BarraFiltro;

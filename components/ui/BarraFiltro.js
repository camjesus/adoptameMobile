import React from 'react';
import {Button} from 'react-native-elements';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const BarraFiltro = ({navigation, route}) => {
  const heandlePress = () => {
    navigation.navigate('filtros', {navigation, route});
  };
  return (
    <Button
      type="clear"
      onPress={() => heandlePress()}
      icon={<MatIcon name="filter" size={30} color="black" />}
    />
  );
};

export default BarraFiltro;

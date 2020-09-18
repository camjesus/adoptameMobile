import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BarraSuperior = ({navigation, route}) => {
  const user = route.params;

  const heandlePress = () => {
    navigation.navigate('Menu', {user});
  };
  return (
    <Button
      type="clear"
      onPress={() => heandlePress()}
      icon={<Icon name="home" size={30} color="white" />}
    />
  );
};

export default BarraSuperior;

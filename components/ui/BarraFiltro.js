import React from 'react';
import {IconButton} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const BarraFiltro = ({navigation, route}) => {
  const heandlePress = () => {
    navigation.navigate('filtros', {navigation, route});
  };
  return (
    <View>
      <IconButton
        icon="filter"
        color="#FFFFFF"
        style={styles.button}
        onPress={() => heandlePress()}
        size={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 2,
    marginEnd: 10,
    marginTop: 20,
    marginBottom: 0,
    },
});
export default BarraFiltro;

import React, {useState, useEffect} from 'react';
import {IconButton} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const BarraSuperior = ({navigation, route}) => {
  const heandlePress = () => {
    navigation.toggleDrawer();
  };
  return (
    <View>
      <IconButton
        icon="menu"
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
    marginStart: 10,
    marginTop: 20,
    marginBottom: 0,
  },
});
export default BarraSuperior;

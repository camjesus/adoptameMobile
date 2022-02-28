import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, IconButton} from 'react-native-paper';
import globalStyles from '../../styles/global';

function HeaderStatus({navigation, showModal, title}) {
  return (
    <View>
      <View style={style.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() =>
            navigation.navigate('misMascotas', {consultarMascotas: true})
          }
          size={30}
        />
        <Text style={globalStyles.title}>{title}</Text>
        <IconButton
          icon="information-outline"
          color="#FFFFFF"
          style={style.icon}
          onPress={showModal}
          size={30}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
header: {
    paddingBottom: 90,
    backgroundColor: '#F59822',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    justifyContent: 'space-between',
    flexDirection: 'row',
    },
  icon: {
    right: 10,
    top: 10,
    flex: 2,
    },
});

export default HeaderStatus;

import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

const SearchType = ({styles, estado, setEstado}) => {
  return (
    <View style={styles.tipoBusqueda}>
      <Button
        style={styles.buttonGL}
        mode="contained"
        color={estado === 'ADOPCION' ? '#f5bb05' : '#9575cd'}
        labelStyle={styles.labelStyleGroup}
        onPress={() => setEstado('ADOPCION')}>
        Adopción
      </Button>
      <Button
        style={styles.buttonG}
        mode="contained"
        color={estado === 'ENCONTRADO' ? '#f5bb05' : '#9575cd'}
        labelStyle={styles.labelStyleGroup}
        onPress={() => setEstado('ENCONTRADO')}>
        Encontrados
      </Button>
      <Button
        style={styles.buttonGR}
        mode="contained"
        color={estado === 'BUSCADO' ? '#f5bb05' : '#9575cd'}
        labelStyle={styles.labelStyleGroup}
        onPress={() => setEstado('BUSCADO')}>
        Buscados
      </Button>
    </View>
  );
};

export default SearchType;

import React from 'react';
import {Text, IconButton} from 'react-native-paper';
import {View} from 'react-native';
import SearchType from './SearchType';

const HeaderDisponible = ({heandlePress, goToFiltros, estado, styles, setEstado}) => {
  return (
    <View>
    <View style={styles.header}>
        <IconButton
          icon="menu"
          color="#FFFFFF"
          style={styles.button}
          onPress={() => heandlePress()}
          size={30}
        />
        <Text style={styles.title}>Portal Pet</Text>
        <IconButton
          icon="filter"
          color="#FFFFFF"
          style={styles.iconEdit}
          onPress={goToFiltros}
          size={30}
        />
      </View>
      <SearchType estado={estado} setEstado={setEstado} styles={styles} />
      </View>
  );
};
export default HeaderDisponible;

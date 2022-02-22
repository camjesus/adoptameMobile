import React from 'react';
import BarraSuperior from './BarraSuperior';
import {Text, IconButton} from 'react-native-paper';
import {View} from 'react-native';

const HeaderDisponible = ({navigation, goToFiltros, route, styles, props}) => {
  return (
    <View >
     <BarraSuperior
          {...props}
          navigation={navigation}
          route={route}
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
  );
}
export default HeaderDisponible;

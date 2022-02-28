import React from 'react'
import {View, Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';

function ProgressStatus({value, image, textDescription}) {
  return (
    <View style={style.columnEstado}>
      <ProgressCircle
        percent={value}
        radius={40}
        borderWidth={8}
        color="#F59822"
        shadowColor="#999"
        bgColor="#fff">
        {image === 'home-heart' && (
          <Image
            source={require('../../img/home-heart.png')}
            style={style.imglogo}
          />
        )}
        {image === 'home-search' && (
          <Image
            source={require('../../img/home-search.png')}
            style={style.imglogo}
          />
        )}
        {image === 'magnify' && (
          <Image
            source={require('../../img/magnify.png')}
            style={style.imglogo}
          />
        )}
        {image === 'dots' && (
          <Image
            source={require('../../img/dots-horizontal.png')}
            style={style.imglogo}
          />
        )}
      </ProgressCircle>
      <Text style={style.textEstado}>{textDescription}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  columnEstado: {
    flexDirection: 'column',
  },
  textEstado: {
    textAlign: 'center',
    marginTop: 5,
    color: "#000000",
  },
  imglogo: {
    height: 40,
    width: 40,
    opacity: 0.3,
  },
})
export default ProgressStatus;

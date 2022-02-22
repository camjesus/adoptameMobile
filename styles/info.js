import {StyleSheet} from 'react-native';

const infoStyle = StyleSheet.create({
    rowinfo: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    columncenter:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: '#FFFFFF', 
      padding: 20,
      marginHorizontal: '10%',
      marginVertical: '12%',
      elevation: 10,
      borderRadius: 10,
      justifyContent: 'center'
    },
    label: {
      color: "#FFFFFF"
    },
    guardar: {
      justifyContent: 'flex-end',
      padding: 3,
      borderRadius: 5,
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      shadowOffset: {width: 1, height: 13},
      marginHorizontal: '20%',
      marginBottom: 15
    },
    texto: {
      alignItems: 'flex-start',
      paddingHorizontal: 5,
    },
    sub: {
      textAlign: 'left',
      fontSize: 16,
      marginStart: 10,
      padding: 0,
      marginTop: 10,
      color: '#9575cd'
    },
    infoContent: {
      flexDirection: 'column',
      padding: 20
    },
  })

  export default infoStyle;

import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: '2.5%',
  },
  titulo: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 50,
    color: '#FFFFFF',
  },
  base: {
    backgroundColor: 'white',
    flex: 1,
  },
  msjAdvertencia: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
    marginVertical: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  msjDisponibles: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
    color: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 26,
    marginTop: 20,
    padding: 0,
    flex: 5,
    marginBottom: 0,
  },
  header: {
    paddingBottom: 10,
    backgroundColor: '#FFAD00',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    flexDirection: 'row',
   },
   iconBack: {
    flex: 2,
    marginStart: 10,
    marginTop: 20,
    marginBottom: 0,
  },
  viewR: {
    flex: 2,
    marginEnd: 10,
    marginTop: 20,
    marginBottom: 0,
  },
});

export default globalStyles;

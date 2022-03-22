import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import constantes from '../../components/context/Constantes';
import * as firebase from 'firebase';

export const SIGNUP = 'SIGNUP';
export const NEW_USER = 'NEW_USER';
export const UPD_USER = 'UPD_USER';
export const CHECK_USER_ID = 'CHECK_USER_ID';
export const DELETE_STORAGE = 'DELETE_STORAGE';

export const signup = (usuario, password) => {
  return async (dispatch) => {
    try {
      const postUsuarios = {usuario, password};
      const url = constantes.BASE_URL + 'ingresarMobile';
      const resultado = await axios.post(url, postUsuarios);
      console.log(resultado);
      if (resultado.data.id === null) {
        //guardaMensaje('Usuario no encontrado');
        //ingresarAlerta(true);
        return;
      }
      console.log('me logueo bien , guardo el user');
      //guardoUsuario(resultado.data);
      await AsyncStorage.setItem('userId', JSON.stringify(resultado.data.id));
      await AsyncStorage.setItem('nombre', resultado.data.nombre);
      await AsyncStorage.setItem('apellido', resultado.data.apellido);
      await AsyncStorage.setItem('telefono', resultado.data.telefono);
      await AsyncStorage.setItem('email', resultado.data.email);

      firebase
        .auth()
        .signInWithEmailAndPassword(usuario, password)
        .then((response) => {
          console.log('correctamente');
          console.log(response);
        })
        .catch((err) => {
          console.log('ERROR');
          console.log(err);
        });
      dispatch({
        type: SIGNUP,
        userId: resultado.data.id,
      });
    } catch (error) {
      //guardaMensaje('Ha ocurrido un error intente nuevamente');
      //ingresarAlerta(true);
      console.log('erro buscanbdo usuario' + error);
    }
  };
};

export const AddnewUser = (newUser) => {
  return async (dispatch) => {
    const url = constantes.BASE_URL + 'signInUser/';
    const resultado = await axios.post(url, newUser);

    if (resultado.data.status === 'SUCESS') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((response) => {
          console.log(response);
        })
        .cath((err) => {
          console.log(err);
        });
    }

    await AsyncStorage.setItem('userId', JSON.stringify(resultado.data.id));
    await AsyncStorage.setItem('nombre', newUser.nombre);
    await AsyncStorage.setItem('apellido', newUser.apellido);
    await AsyncStorage.setItem('telefono', newUser.telefono);
    await AsyncStorage.setItem('email', newUser.email);

    dispatch({
      type: NEW_USER,
      userId: resultado.data.id,
    });
  };
};

export const updateUser = (usuario) => {
  return async (dispatch) => {
    try {
      const url = constantes.BASE_URL + 'modifyUser';
      console.log(usuario);
      const resultado = await axios.post(url, usuario);
      console.log(resultado.data.status);
      if (resultado.data.status === 'SUCESS') {
        //guardaMensaje('El usuario se editó con éxito');
        //ingresarAlerta(true);
        await AsyncStorage.setItem('nombre', usuario.nombre);
        await AsyncStorage.setItem('apellido', usuario.apellido);
        await AsyncStorage.setItem('telefono', usuario.telefono);
        await AsyncStorage.setItem('email', usuario.email);

        return;
      }
    } catch (error) {
      console.log(error);
      //guardaMensaje('Error al editar el usuario');
      //ingresarAlerta(true);
      return;
    }
  };
};

export const checkUserID = () => {
  return async (dispatch) => {
    let userId = null;
    console.log('paso por check User');
    await AsyncStorage.getItem('userId');
    AsyncStorage.getItem('userId').then((value) => {
      userId = value;
      console.log(value);

      dispatch({
        type: CHECK_USER_ID,
        userId: userId,
      });
    });
  };
};

export const deleteStorage = () => {
  return async (dispatch) => {
    try {
      console.log('borro del storage');
      await AsyncStorage.removeItem('nombre');
      await AsyncStorage.removeItem('apellido');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('userId');

      firebase.auth().signOut();
    } catch (error) {
      console.log('error eliminando del storage' + error);
    }

    dispatch({
      type: DELETE_STORAGE,
      userId: null,
    });
    dispatch({
      type: CHECK_USER_ID,
      userId: null,
    });
  };
};

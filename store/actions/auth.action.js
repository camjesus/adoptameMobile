import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import constantes from '../../components/context/Constantes';
import * as firebase from 'firebase';

export const SIGNUP = 'SIGNUP';
export const NEW_USER = 'NEW_USER';
export const CHECK_USER_ID = 'CHECK_USER_ID';
export const DELETE_STORAGE = 'DELETE_STORAGE';

export const signup = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: SIGNUP,
      userId: userId,
    });
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

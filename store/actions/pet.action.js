import axios from 'axios';
import constantes from '../../components/context/Constantes';
import * as firebase from 'firebase';
import firebaseApp from '../../database/firebaseDB';
const db = firebase.firestore(firebaseApp);

export const NEW_PET = 'NEW_USER';

export const AddNewPet = (pet, changePhoto) => {
  return async (dispatch) => {
    console.log(pet);
    const urlUpload = constantes.BASE_URL + 'uploadPet';
    axios
      .request({
        method: 'post',
        url: urlUpload,
        data: pet,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log('response');
        console.log(response);
        if (changePhoto) {
          updateFotoFirebase(response.data.foto_url, response.data.id);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        //gTitulo('Nueva Mascota');
        //guardaMensaje('Ha ocurrido un error, intente mas tarde');
        //ingresarAlerta(true);
      });
    dispatch({
      type: NEW_PET,
      pet: pet,
    });
  };
};

const updateFotoFirebase = (newFoto, mascotaId) => {
  db.collection('chats')
    .where('idMascota', '==', mascotaId)
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) =>
        db.collection('chats').doc(doc.id).update({
          imagenMascota: newFoto,
        }),
      );
    });
};

export const changeStatus = (id, status) => {
  return async (dispatch) => {
    const postEstado = {id, estado: status};
    const url = constantes.BASE_URL + 'estadoMascota';
    const resultado = await axios.post(url, postEstado);

    return resultado;
  };
};

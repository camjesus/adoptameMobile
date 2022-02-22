import React, {useEffect, useState, useRef} from 'react';
import constantes from '../components/context/Constantes';
import axios from 'axios';


const getById = async (id) => {
    try {
     const url = constantes.BASE_URL + `mascotasUsuario/${id}`;
      console.log(url);
      const resultado = await axios.get(url);
      console.log(resultado.data);
      console.log('paso por obetener mascotas');
      return resultado.data;
    } catch (error) {
      console.log(error);
    }
  };

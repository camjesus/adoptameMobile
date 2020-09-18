import React from 'react';

const UserContext = React.createContext({
  id: '',
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
});

export default UserContext;

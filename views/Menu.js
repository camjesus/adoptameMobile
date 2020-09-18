import React from 'react';
import Navigation from '../navigations/Navigation';

const Menu = ({route, navigation}) => {
  return <Navigation params={(navigation, route)} />;
};

export default Menu;

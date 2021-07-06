import React from 'react';
import classes from './MenuToggler.module.css';

const MenuToggler = props => {

  const cls = [
    classes.MenuToggler,
    'fa'
  ];

  if (props.isOpened) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }

return <i
  className={cls.join(' ')}
  onClick={() => props.toggleMenu()}/>
}

export default MenuToggler
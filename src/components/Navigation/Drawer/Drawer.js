import React from "react";
import classes from './Drawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from 'react-router-dom';

const Drawer = props => {

  const cls = [
      classes.Drawer
  ]

  if (!props.isOpened) {
    cls.push(classes.close)
  }

  const renderLinks = (links) => {
   return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            onClick={() => props.menuCloseHandler()}
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  const links = [
    { to: '/', label: 'List', exact: true },
  ];

  console.log("AUTH", props.isAuthenticated)

  if (props.isAuthenticated) {
    links.push({ to: '/logout', label: 'Log out', exact: false });
    links.push({ to: '/quiz-creator', label: 'Create the Quiz', exact: false });
  } else {
    links.push({ to: '/auth', label: 'Authorization', exact: false })
  }

return (
  <>
    <nav className={cls.join(' ')}>
      <ul>
        {renderLinks(links)}
      </ul>
    </nav>
    {props.isOpened ? <Backdrop onClick={() => props.menuCloseHandler()}/> : null}
  </>

    )
}

export default Drawer;
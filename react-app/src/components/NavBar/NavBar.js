
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css";

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <div className="sessionButtons">
      {user ? <div><button id="logoutButton" type="button">{user.username}</button><LogoutButton /></div>
      :
      <>
      <button id="navLoginButton"><NavLink to='/login' exact={true} activeClassName='active'>Login</NavLink></button> 
      <button id="navSignUpButton"><NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink></button>
      </>
      }
    </div>
    );
}

export default NavBar;

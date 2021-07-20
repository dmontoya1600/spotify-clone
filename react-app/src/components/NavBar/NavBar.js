import React from 'react';
import { useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';
import "./NavBar.css";

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const isSearch = useLocation();

  return (
      <div className="navigation__container">

       {isSearch.pathname === "/search" && 
       <div id="searchBar">
       <input type="search"/>
       </div>
       } 
      {user ? <LogoutButton />
      :
      <>
      <NavLink to='/sign-up' exact={true} activeClassName='active'><button id="navSignUpButton">Sign Up</button></NavLink>
      <NavLink to='/login' exact={true} activeClassName='active'><button id="navLoginButton">Login</button></NavLink>
      </>
      }
      </div>
    );
}

export default NavBar;

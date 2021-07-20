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

        <div id="search">
       {isSearch.pathname === "/search" && 
       <input id="searchBar" type="search" placeholder="Search Artists, Songs, or Playlists" />
       } 
       <input id="searchBar" type="search" placeholder="Search Artists, Songs, or Playlists" />
       </div>

       <div id="sessionButtons">
      {user ? <LogoutButton /> :
      <>
      <NavLink to='/sign-up' exact={true} activeClassName='active'><button id="navSignUpButton">Sign Up</button></NavLink>
      <NavLink to='/login' exact={true} activeClassName='active'><button id="navLoginButton">Login</button></NavLink>
      </>
      }
      </div>
      
      </div>
    );
}

export default NavBar;

import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css";
import { setSearch } from '../../store/search';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const token = useSelector((state) => state.access.access_token)
  const [searchInput, setSearchInput] = useState("")
  const dispatch = useDispatch()
  const location = useLocation().pathname

  useEffect(async()=> {
    if (!searchInput) {
      dispatch(setSearch({}))
    }
    if (token && searchInput) {
         const res = await fetchSearch(token, searchInput)
         dispatch(setSearch(res))
    }
  }, [searchInput])

  async function fetchSearch(token, name) {
      const res = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=track,album,artist`, {
          method: "GET",
          headers: { "Authorization" : "Bearer " + token}
      })
      const data = await res.json()
      return data
  }
  return (
      <div className="navigation__container">

      <div id="search">
        <input id="searchBar" value={searchInput} type="search"
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Artists, Songs, or Playlists"
                style={{visibility: location === "/search" || location.startsWith("/playlists") ? "visible" : "hidden" }}
                />
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

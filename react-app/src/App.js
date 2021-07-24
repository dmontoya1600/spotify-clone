import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm/LoginForm';
import SignUpForm from './components/auth/SignUpForm/SignUp';
import Search from "./components/Search";
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import MyLibrary from './components/MyLibrary';
import SinglePlaylist from './components/SinglePlaylist';
import { authenticate } from './store/session';
import { getToken } from './store/accessToken';
import { client_id, client_secret } from './config';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar';
import MusicPlayer from './components/MusicPlayer';
import HomePage from './components/HomePage';
import EditPlaylist from './components/SinglePlaylist/editPlaylist';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(getToken(client_id, client_secret))
    })()
  }, [])

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
      <div className='Main__container'>
        <NavBar />
        <SideBar />
        <MusicPlayer />
        <div className='MainContent__container'>
        <Switch>
          <Route path='/' exact={true}>
              <HomePage/>
            </Route>
          <Route path='/search' exact={true}>
            <Search/>
            </Route>
          <Route path='/mylibrary' exact={true}>
            <MyLibrary/>
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList/>
          </ProtectedRoute>
          <Route path='/playlists/:playlistId' exact={true} >
            <SinglePlaylist />
          </Route>
          <ProtectedRoute path='/playlists/:playlistId/edit' exact={true} >
            <EditPlaylist />
          </ProtectedRoute>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
  );
}

export default App;

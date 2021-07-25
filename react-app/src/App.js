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
import LikedPlaylists from './components/LikedPlaylists';


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
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true}>
          <div className='Main__container'>
            <NavBar />
            <SideBar />
            <MusicPlayer />
            <div className='MainContent__container'>
              <HomePage/>
            </div>
          </div>
        </Route>
        <Route path='/search' exact={true}>
          <div className='Main__container'>
            <NavBar />
            <SideBar />
            <MusicPlayer />
            <div className='MainContent__container'>
            <Search/>
            </div>
          </div>
        </Route>
        <Route path='/mylibrary' exact={true}>
          <div className='Main__container'>
            <NavBar />
            <SideBar />
            <MusicPlayer />
            <div className='MainContent__container'>
              <MyLibrary/>
            </div>
          </div>
        </Route>
        <Route path='/likedplaylists' exact={true}>
          <div className='Main__container'>
            <NavBar />
            <SideBar />
            <MusicPlayer />
            <div className='MainContent__container'>
              <LikedPlaylists/>
            </div>
          </div>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <Route path='/playlists/:playlistId' exact={true} >
        <div className='Main__container'>
            <NavBar />
            <SideBar />
            <MusicPlayer />
            <div className='MainContent__container'>
              <SinglePlaylist />
            </div>
          </div>
        </Route>
        <ProtectedRoute path='/playlists/:playlistId/edit' exact={true} >
          <EditPlaylist />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

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
import Main from "./components/Main"
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
      <Switch>
        <Route path='/' exact={true}>
          <Main />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
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
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/playlists/:playlistId' exact={true} >
          <SinglePlaylist />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/playlists/:playlistId/edit' exact={true} >
          <EditPlaylist />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

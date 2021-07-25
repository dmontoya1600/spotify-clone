import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const history = useHistory();

  const onLogout = async (e) => {
    await dispatch(logout());
    return history.push("/");
  };

  return <button id="logoutButton" onClick={onLogout}>Logout</button>;

};

export default LogoutButton;

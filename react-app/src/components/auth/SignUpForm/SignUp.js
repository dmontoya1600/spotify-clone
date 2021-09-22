import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp, login } from '../../../store/session';
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["* Passwords don't match"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleDemo = async () => {
    const data = await dispatch(login("demo@aa.io", "demopassword"));
    if (data) {
      setErrors(data);
    }
  }

  return (
    <div className="signUpForm__container">

      <div className="signUpForm__header"><NavLink to="/" exact={true}><div className="logo"></div></NavLink></div>

      <div className="signUpForm__main">

        <form onSubmit={onSignUp} className="signUpForm">
          <div className="signUpForFree">Sign up for free to start listening.</div>
          <button type="button" className="demoButton" onClick={handleDemo}>CONTINUE WITH DEMO</button>
          <div className="orDivider">OR</div>
          <div>
            {errors.map((error, ind) => (
          <div key={ind} className="signUpForm__Error">{error}</div>
        ))}
      </div>
        <label htmlFor="username" className="usernameLabel">User Name</label>
        <input
        id="usernameInput"
          type="text"
          name="username"
          placeholder="User Name"
          onChange={updateUsername}
          value={username}
          required
        ></input>
        <label htmlFor="email" id="emailLabel">Email</label>
        <input
        id="emailInput"
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder="Email"
          required
          type="email"
        ></input>
        <label htmlFor="password" id="passwordLabel" >Password</label>
        <input
        id="passwordInput"
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder="Password"
          required
        ></input>
        <label htmlFor="repeat_password" id="repeatePasswordLabel">Repeat Password</label>
        <input
        id="repeatePasswordInput"
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder="Repeat Password"
          required
        ></input>
      <button type='submit' id="signUpButton">Sign Up</button>
    </form>
    </div>
    </div>
  );
};

export default SignUpForm;

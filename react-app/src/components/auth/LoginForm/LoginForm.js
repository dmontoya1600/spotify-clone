import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' exact={true} />;
  }

  const handleDemo = async () => {
    const data = await dispatch(login("demo@aa.io", "demopassword"));
    if (data) {
      setErrors(data);
    }
  };

  const handleSignUp = () => {
    return history.push("/sign-up")
  }

  return (
    <div className="loginForm__container">

      <div className="loginForm__header"><NavLink to="/" exact={true}><div className="logo">Audify</div></NavLink></div>

      <div className="loginForm__main">

        <form onSubmit={onLogin} className="loginForm">
          <div className="toContinue">To continue, log in to Audify.</div>
          <button type="button" className="demoButton" onClick={handleDemo}>CONTINUE WITH DEMO</button>
          <div className="orDivider">OR</div>
          <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
          </div>
        <label htmlFor='email' className="emailLabel">Email</label>
        <input
        id="emailInput"
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
        <label htmlFor='password' className="passwordLabel">Password</label>
        <input
          id="passwordInput"
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit' className="loginButton">Login</button>
    </form>
    <div className="signUp__container">
      <div className="noAccount">Don't have an account?</div>
      <button type="button" id="loginSignUpButton" onClick={handleSignUp}>SIGN UP FOR SPOTIFY</button>
    </div>
    </div>
    </div>
  );
};

export default LoginForm;

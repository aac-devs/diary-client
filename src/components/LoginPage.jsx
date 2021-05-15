import React from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { startAuth } from '../actions/auth.actions';
import useCustomForm from '../hooks/useCustomForm';

const LoginPage = () => {
  // const dispatch = useDispatch();
  const [formValues, handleInputChange] = useCustomForm({
    email: 'aac@mail.com',
    password: '123456',
  });
  const { email, password } = formValues;
  const submitLogin = (e) => {
    e.preventDefault();
    // dispatch(startAuth('login', email, password));
  };
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={submitLogin}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </label>
        <br />
        <input type="submit" value="Send" />
      </form>
      <Link className="link" to="/auth/register">
        Create new account
      </Link>
    </div>
  );
};

export default LoginPage;

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRegister } from '../actions/auth.actions';
// import { startAuth } from '../actions/auth.actions';
import useCustomForm from '../hooks/useCustomForm';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useCustomForm({
    name: 'Andres Arana C',
    email: 'aac@mail.com',
    pass1: '123456',
    pass2: '123456',
  });
  const { name, email, pass1, pass2 } = formValues;

  // eslint-disable-next-line no-console
  console.log('----------------Renderiza Register Page');

  const submitRegister = (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      // eslint-disable-next-line no-alert
      alert('Las contraseñas no coinciden');
      // return;
    }
    // dispatch(startAuth('register', email, pass1, name));
    dispatch(startRegister({ email, password: pass1, name }));
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={submitRegister}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </label>
        <br />
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
        <label htmlFor="pass1">
          Password 1:
          <input
            type="password"
            name="pass1"
            value={pass1}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </label>
        <br />
        <label htmlFor="pass2">
          Password 2:
          <input
            type="password"
            name="pass2"
            value={pass2}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </label>
        <br />
        <input type="submit" value="Send" />
      </form>
      <Link className="link" to="/auth">
        Already registered
      </Link>
    </div>
  );
};

export default RegisterPage;

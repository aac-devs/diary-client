import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Icon, Link as MuiLink } from '@material-ui/core';
import useCustomForm from '../hooks/useCustomForm';
import { startLogin } from '../actions/auth.actions';
import CustomizedSnackbars from './Snackbar';
import { removeError, removeSuccess } from '../actions/ui.actions';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 280,
    width: 350,
    margin: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    borderRadius: 10,
    border: '1px solid #eee',
    boxShadow: '2px 2px 5px #aaa',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  link: {
    color: 'dodgerBlue',
  },
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useCustomForm({
    email: '',
    password: '',
  });
  const { email, password } = formValues;
  const { msgError, msgSuccess } = useSelector((state) => state.ui);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const classes = useStyles();
  const [validate, setValidate] = useState({
    email: false,
    password: false,
  });
  const [btnEnabled, setBtnEnabled] = useState(false);

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin({ email: email.trim(), password: password.trim() }));
  };

  useEffect(() => {
    if (msgError || msgSuccess) {
      setIsNotificationOpen(true);
    }
  }, [msgError, msgSuccess]);

  const handleClose = () => {
    setIsNotificationOpen(false);
    dispatch(removeSuccess());
    dispatch(removeError());
    reset();
  };

  useEffect(() => {
    const emailRegex = RegExp(
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    );
    setValidate({
      ...validate,
      email: emailRegex.test(email),
    });
  }, [formValues.email]);

  useEffect(() => {
    if (password.length >= 6) {
      setValidate({
        ...validate,
        password: true,
      });
    } else {
      setValidate({
        ...validate,
        password: false,
      });
    }
  }, [formValues.password]);

  useEffect(() => {
    const { email: e, password: p } = validate;
    if (e && p) {
      setBtnEnabled(true);
    } else {
      setBtnEnabled(false);
    }
  }, [validate]);

  return (
    <>
      <CustomizedSnackbars
        isOpen={isNotificationOpen}
        handleClose={handleClose}
        type={msgError ? 'error' : 'success'}
        message={msgError || msgSuccess}
      />
      <div className={classes.root}>
        <form
          className={classes.card}
          noValidate
          autoComplete="off"
          onSubmit={submitLogin}
        >
          <div className={classes.title}>Login</div>
          <TextField
            label="Email"
            variant="outlined"
            onChange={handleInputChange}
            name="email"
            value={email}
            size="medium"
            error={email !== '' && !validate.email}
          />
          <br />
          <TextField
            label="Password"
            variant="outlined"
            onChange={handleInputChange}
            name="password"
            value={password}
            type="password"
            size="medium"
            error={password !== '' && !validate.password}
          />
          <br />
          {btnEnabled ? (
            <Button
              variant="contained"
              color="primary"
              onClick={submitLogin}
              size="medium"
              endIcon={<Icon>send</Icon>}
            >
              Send
            </Button>
          ) : (
            <Button variant="contained" endIcon={<Icon>send</Icon>} disabled>
              Send
            </Button>
          )}
          <br />
          <MuiLink component="button">
            <Link className={classes.link} to="/auth/register">
              Create new account
            </Link>
          </MuiLink>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

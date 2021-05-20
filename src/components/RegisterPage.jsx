import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Icon, Link as MuiLink } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { startRegister } from '../actions/auth.actions';
import useCustomForm from '../hooks/useCustomForm';
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

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useCustomForm({
    name: '',
    email: '',
    pass1: '',
    pass2: '',
  });
  const { name, email, pass1, pass2 } = formValues;
  const { msgError, msgSuccess } = useSelector((state) => state.ui);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const classes = useStyles();
  const [validate, setValidate] = useState({
    name: false,
    email: false,
    passwords: false,
  });
  const [btnEnabled, setBtnEnabled] = useState(false);

  useEffect(() => {
    const nameRegex = RegExp(/^[a-zA-Záéíóúü ,.'-]+$/u);
    setValidate({
      ...validate,
      name: nameRegex.test(name),
    });
  }, [formValues.name]);

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
    if (pass1.length >= 6 && pass2.length >= 6) {
      if (pass1 !== pass2) {
        setValidate({
          ...validate,
          passwords: false,
        });
      } else {
        setValidate({
          ...validate,
          passwords: true,
        });
      }
    } else {
      setValidate({
        ...validate,
        passwords: false,
      });
    }
  }, [formValues.pass1, formValues.pass2]);

  useEffect(() => {
    const { name: n, email: e, passwords: p } = validate;
    if (n && e && p) {
      setBtnEnabled(true);
    } else {
      setBtnEnabled(false);
    }
  }, [validate]);

  const submitRegister = (e) => {
    e.preventDefault();
    if (btnEnabled) {
      dispatch(startRegister({ email, password: pass1, name }));
    }
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
  };

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
          onSubmit={submitRegister}
        >
          <div className={classes.title}>Register</div>
          <TextField
            label="Name"
            variant="outlined"
            onChange={handleInputChange}
            name="name"
            value={name}
            size="medium"
            error={name !== '' && !validate.name}
          />
          <br />
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
            name="pass1"
            value={pass1}
            type="password"
            size="medium"
          />
          <br />
          <TextField
            label="Confirm password"
            variant="outlined"
            onChange={handleInputChange}
            name="pass2"
            value={pass2}
            type="password"
            size="medium"
            error={pass2 !== '' && !validate.passwords}
          />
          <br />
          {btnEnabled ? (
            <Button
              variant="contained"
              color="primary"
              onClick={submitRegister}
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
            <Link className={classes.link} to="/auth">
              Already registered?
            </Link>
          </MuiLink>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;

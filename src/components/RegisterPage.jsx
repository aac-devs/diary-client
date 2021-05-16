import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Icon, Link as MuiLink } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { startRegister } from '../actions/auth.actions';
import useCustomForm from '../hooks/useCustomForm';

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
    name: 'Andres Arana C',
    email: 'aac@mail.com',
    pass1: '123456',
    pass2: '123456',
  });
  const { name, email, pass1, pass2 } = formValues;
  const classes = useStyles();

  // eslint-disable-next-line no-console
  console.log('----------------Renderiza Register Page');

  const submitRegister = (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      // eslint-disable-next-line no-alert
      alert('Las contraseñas no coinciden');
      // return;
    }
    dispatch(startRegister({ email, password: pass1, name }));
  };

  return (
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
        />
        <br />
        <TextField
          label="Email"
          variant="outlined"
          onChange={handleInputChange}
          name="email"
          value={email}
          size="medium"
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
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={submitRegister}
          size="medium"
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
        <br />
        <MuiLink component="button">
          <Link className={classes.link} to="/auth">
            Already registered
          </Link>
        </MuiLink>
      </form>
    </div>
  );
};

export default RegisterPage;

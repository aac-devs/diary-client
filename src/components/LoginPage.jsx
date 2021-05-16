import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Icon, Link as MuiLink } from '@material-ui/core';
import useCustomForm from '../hooks/useCustomForm';
import { startLogin } from '../actions/auth.actions';

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
  const [formValues, handleInputChange] = useCustomForm({
    email: 'aac@mail.com',
    password: '123456',
  });
  const { email, password } = formValues;
  const classes = useStyles();

  const submitLogin = (e) => {
    e.preventDefault();
    console.log('submittt');
    dispatch(startLogin({ email: email.trim(), password: password.trim() }));
    // dispatch(startAuth('login', email, password));
  };
  return (
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
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={submitLogin}
          size="medium"
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
        <br />
        <MuiLink component="button">
          <Link className={classes.link} to="/auth/register">
            Create new account
          </Link>
        </MuiLink>
      </form>
    </div>
  );
};

export default LoginPage;

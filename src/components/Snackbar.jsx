import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert as MuiAlert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notification = ({ isOpen, handleClose, type, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={isOpen}
        autoHideDuration={type === 'error' ? 5000 : 2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

Notification.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  type: PropTypes.string,
  message: PropTypes.string,
};

Notification.defaultProps = {
  isOpen: false,
  handleClose: () => {},
  type: 'success',
  message: 'Notificando una acción realizada',
};

export default Notification;

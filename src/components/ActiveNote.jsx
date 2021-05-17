import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import {
  Save as SaveIcon,
  ImageSearch as ImageSearchIcon,
  Replay as ReplayIcon,
} from '@material-ui/icons';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import {
  deactiveNote,
  // startDeleting,
  startSaveNote,
} from '../actions/notes.actions';
import useCustomForm from '../hooks/useCustomForm';
// import { NothingSelected } from './NothingSelected';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#1976d2',
  },
  btn: {
    borderRadius: 0,
  },
  body: {
    padding: '10px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  iconBtn: {
    width: '42px',
    minWidth: '42px',
    padding: '0px',
  },
  icon: {
    fontSize: '30px',
    width: '30px',
    margin: '0px',
  },
}));

const ActiveNote = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useCustomForm(note);
  const { title, body } = formValues;
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  const handleBackToList = () => {
    dispatch(deactiveNote());
  };

  const handleSaveNote = () => {
    dispatch(
      startSaveNote({
        title,
        body,
      }),
    );
  };

  // const handleDeleteNote = () => {
  //   dispatch(startDeleting(note.id));
  //   dispatch(deactiveNote());
  // };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="subtitle1" className={classes.title}>
            {dayjs(note.date).format('dddd, MMMM DD[th], YYYY')}
          </Typography>
          <Button color="inherit" className={classes.iconBtn}>
            <ImageSearchIcon className={classes.icon} />
          </Button>
          <Button color="inherit" className={classes.iconBtn}>
            <DeleteForeverIcon className={classes.icon} />
          </Button>
          <Button color="inherit" className={classes.iconBtn}>
            <SaveIcon className={classes.icon} onClick={handleSaveNote} />
          </Button>
          {matches && (
            <Button
              color="inherit"
              className={classes.iconBtn}
              type="button"
              onClick={handleBackToList}
            >
              <ReplayIcon className={classes.icon} />
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <TextField
          id="standard-multiline-flexible"
          label="Title"
          multiline
          rowsMax={4}
          placeholder="Write an awesome title!"
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-textarea"
          label="Body"
          placeholder="Describe your note."
          multiline
          name="body"
          value={body}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ActiveNote;

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Save as SaveIcon,
  ImageSearch as ImageSearchIcon,
  Replay as ReplayIcon,
} from '@material-ui/icons';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';

import {
  deactiveNote,
  startDeleting,
  startSaveNote,
  startUploading,
} from '../actions/notes.actions';
import useCustomForm from '../hooks/useCustomForm';
import ConfirmDialog from './ConfirmDialog';
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
  square: {
    backgroundColor: '#fff',
    height: '150px',
    width: '150px',
    margin: '5px',
  },
}));

const ActiveNote = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useCustomForm(note);
  const { title, body } = formValues;
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

  const handleDeleteNote = () => {
    setOpenDeleteDialog(true);
  };

  const handleDialogResponse = (agree) => {
    setOpenDeleteDialog(false);
    if (agree) {
      dispatch(startDeleting(note.id));
      dispatch(deactiveNote());
    }
  };

  const handlePictureUpload = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className={classes.root}>
      <ConfirmDialog
        isOpen={openDeleteDialog}
        handleClose={handleDialogResponse}
        title="Delete Note"
        message="Are you sure you want to delete this note?"
      />
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="subtitle1" className={classes.title}>
            {dayjs(note.date).format('dddd, MMMM DD[th], YYYY')}
          </Typography>
          <input
            id="fileSelector"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Tooltip
            title="Add an image to the note"
            aria-label="add"
            arrow
            placement="bottom"
          >
            <Button
              color="inherit"
              className={classes.iconBtn}
              onClick={handlePictureUpload}
            >
              <ImageSearchIcon className={classes.icon} />
            </Button>
          </Tooltip>
          <Tooltip
            title="Delete current note"
            aria-label="add"
            arrow
            placement="bottom"
          >
            <Button
              color="inherit"
              className={classes.iconBtn}
              onClick={handleDeleteNote}
            >
              <DeleteForeverIcon className={classes.icon} />
            </Button>
          </Tooltip>
          <Tooltip
            title="Update current note"
            aria-label="add"
            arrow
            placement="bottom"
          >
            <Button color="inherit" className={classes.iconBtn}>
              <SaveIcon className={classes.icon} onClick={handleSaveNote} />
            </Button>
          </Tooltip>
          {matches && (
            <Tooltip
              title="Back to note list"
              aria-label="add"
              arrow
              placement="bottom"
            >
              <Button
                color="inherit"
                className={classes.iconBtn}
                type="button"
                onClick={handleBackToList}
              >
                <ReplayIcon className={classes.icon} />
              </Button>
            </Tooltip>
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
        <br />
        <Avatar variant="square" className={classes.square} src={note.image}>
          <CropOriginalIcon color="disabled" fontSize="large" />
        </Avatar>
      </div>
    </div>
  );
};

export default ActiveNote;

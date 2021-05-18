import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonIcon from '@material-ui/icons/Person';
import NoteCard from './NoteCard';
import {
  deactiveNote,
  selectNewNote,
  startDeleteAllNotes,
} from '../actions/notes.actions';
import { startLogout } from '../actions/auth.actions';
import ConfirmDialog from './ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: 'yellow',
    height: '100%',
    position: 'relative',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#1c1e21',
  },
  noteList: {
    padding: '10px',
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
  userIcon: {
    marginRight: '5px',
  },
  fab: {
    // margin: theme.spacing(1),
    position: 'absolute',
    bottom: '20px',
    right: '10px',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const NotesList = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);
  const { name } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleAddNew = () => {
    dispatch(deactiveNote());
    dispatch(selectNewNote());
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleDeleteAllNotes = () => {
    setOpenDeleteDialog(true);
  };

  const handleDialogResponse = (agree) => {
    setOpenDeleteDialog(false);
    if (agree) {
      dispatch(startDeleteAllNotes());
    }
  };

  console.log({ notes });

  return (
    <div className={classes.root}>
      <ConfirmDialog
        isOpen={openDeleteDialog}
        handleClose={handleDialogResponse}
        title="Delete All Notes"
        message="Are you sure you want to delete all notes?"
      />
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <PersonIcon className={classes.userIcon} />
          <Typography variant="subtitle1" className={classes.title}>
            {name}
          </Typography>
          <Button
            color="inherit"
            onClick={handleAddNew}
            className={classes.iconBtn}
          >
            <AddIcon className={classes.icon} />
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            className={classes.iconBtn}
          >
            <ExitToAppIcon className={classes.icon} />
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.noteList}>
        {notes.length > 0 && (
          <>
            {notes.map((note) => {
              return <NoteCard key={note.id} {...note} />;
            })}
          </>
        )}
      </div>
      {notes.length > 0 && (
        <Fab
          variant="extended"
          color="secondary"
          aria-label="delete"
          className={classes.fab}
          onClick={handleDeleteAllNotes}
        >
          <DeleteForeverIcon className={classes.extendedIcon} />
          delete all notes
        </Fab>
      )}
    </div>
  );
};

export default NotesList;

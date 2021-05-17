import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import { startLoadingNotes } from '../actions/notes.actions';
import ActiveNote from './ActiveNote';
import NotesList from './NotesList';
// import NothingSelected from './NothingSelected';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    // backgroundColor: 'cyan',
    height: '100%',
  },
  grid: {
    // backgroundColor: 'lime',
    height: '100%',
  },
  sidebar: {
    backgroundColor: '#1c1e21',
  },
  main: {
    // backgroundColor: 'purple',
  },
}));

const HomePage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const { loading } = useSelector((state) => state.ui);
  const { active } = useSelector((state) => state.notes);
  const matches = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch(startLoadingNotes());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.grid}>
        <Grid
          item
          xs={active ? false : 12}
          sm={5}
          md={4}
          className={classes.sidebar}
        >
          {matches && active ? null : <NotesList />}
        </Grid>
        <Grid
          item
          xs={active ? 12 : false}
          sm={7}
          md={8}
          className={classes.main}
        >
          {active && <ActiveNote />}
        </Grid>
      </Grid>
      {/* {loading && <h5>Espere...</h5>}
      {!active && <NothingSelected />} */}
    </div>
  );
};

export default HomePage;

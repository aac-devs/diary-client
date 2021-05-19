import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'fixed',
    top: '30%',
    left: '50%',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Loading;

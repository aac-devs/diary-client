import { makeStyles } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '150px',
    color: '#aaa',
  },
}));

const NothingSelected = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DescriptionIcon className={classes.icon} />
    </div>
  );
};

export default NothingSelected;

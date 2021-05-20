import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { Avatar, Typography, Box } from '@material-ui/core';
import { activeNote } from '../actions/notes.actions';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  card: {
    marginBottom: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#fff',
    border: '1px solid #777',
    boxShadow: '1px 1px 2px #aaa',
    cursor: 'pointer',
  },
  body: {
    margin: '5px 0',
    flexGrow: 1,
  },
  date: {
    margin: '5px',
    width: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    backgroundColor: '#fff',
    height: '70px',
    width: '70px',
    margin: '5px',
  },
  title: {
    maxHeight: '24px',
    overflow: 'hidden',
  },
  description: {
    maxHeight: '36px',
    overflow: 'hidden',
  },
}));

const NoteCard = ({ id, title, body, date, image }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleNoteClick = () => {
    dispatch(
      activeNote(id, {
        title,
        body,
        date,
        image,
      }),
    );
  };

  const handleKeyDown = () => {};

  return (
    <div
      className={classes.card}
      onClick={handleNoteClick}
      role="button"
      tabIndex="0"
      onKeyPress={handleKeyDown}
    >
      <div>
        <Avatar variant="square" className={classes.square} src={image}>
          <CropOriginalIcon color="disabled" fontSize="large" />
        </Avatar>
      </div>
      <div className={classes.body}>
        <Typography component="div">
          <Box
            textAlign="left"
            fontWeight="fontWeightMedium"
            fontSize={16}
            mb={1}
            className={classes.title}
          >
            {title}
          </Box>
          <Box
            textAlign="left"
            fontWeight="fontWeightLight"
            fontSize={12}
            className={classes.description}
          >
            {body}
          </Box>
        </Typography>
      </div>
      <div className={classes.date}>
        <Typography component="div">
          <Box textAlign="center" fontWeight="bold" fontSize={16}>
            {dayjs(date).format('ddd').toUpperCase()}
          </Box>
          <Box textAlign="center" fontWeight="fontWeightRegular" fontSize={14}>
            {`${dayjs(date).date()}th`}
          </Box>
        </Typography>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
};

NoteCard.defaultProps = {
  id: 0,
  title: '',
  body: '',
  date: '',
  image: '',
};

export default NoteCard;

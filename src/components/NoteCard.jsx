import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { activeNote } from '../actions/notes.actions';

const NoteCard = ({ id, title, body, date }) => {
  const dispatch = useDispatch();

  const handleNoteClick = () => {
    dispatch(
      activeNote(id, {
        title,
        body,
        date,
      }),
    );
  };
  // console.log({ id, title, body, date });
  const handleKeyDown = () => {};

  return (
    <div
      style={{
        width: '100%',
        border: '1px solid black',
      }}
      onClick={handleNoteClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <h3>{title}</h3>
      <p>{body}</p>
      <h5>{date}</h5>
    </div>
  );
};

NoteCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.string,
};

NoteCard.defaultProps = {
  id: 0,
  title: '',
  body: '',
  date: '',
};

export default NoteCard;

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const NoteAppbar = ({
  date,
  showDeleteButton,
  showSaveButton,
  handleSaveNote,
  handleDeleteNote,
}) => {
  const {
    active: { id },
  } = useSelector((state) => state.notes);
  const buttonMsg = id ? 'Update' : 'Save';

  return (
    <div style={{ border: '1px solid black' }}>
      <span>{date}</span>
      {showSaveButton && (
        <button type="button" onClick={handleSaveNote}>
          {buttonMsg}
        </button>
      )}
      {showDeleteButton && (
        <button type="button" onClick={handleDeleteNote}>
          Delete
        </button>
      )}
    </div>
  );
};

NoteAppbar.propTypes = {
  date: PropTypes.string,
  showDeleteButton: PropTypes.bool,
  showSaveButton: PropTypes.bool,
  handleSaveNote: PropTypes.func,
  handleDeleteNote: PropTypes.func,
};

NoteAppbar.defaultProps = {
  date: '',
  showDeleteButton: false,
  showSaveButton: false,
  handleSaveNote: () => {},
  handleDeleteNote: () => {},
};

export default NoteAppbar;

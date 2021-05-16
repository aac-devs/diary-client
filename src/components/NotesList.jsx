import { useDispatch, useSelector } from 'react-redux';
import NoteCard from './NoteCard';
// import styled from 'styled-components';
import { selectNewNote, startDeleteAllNotes } from '../actions/notes.actions';
import { startLogout } from '../actions/auth.actions';
// import { startLogout } from '../actions/auth.actions';

// const Box = styled.div`
//   border: 1px solid black;
//   background-color: wheat;
//   width: ${(props) => props.size};
// `;

const NotesList = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);
  const { name } = useSelector((state) => state.auth);

  const handleAddNew = () => {
    // dispatch(deactiveNote());
    dispatch(selectNewNote());
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleDeleteAllNotes = () => {
    dispatch(startDeleteAllNotes());
  };

  return (
    <div size={`${300}px`}>
      <span>{name}</span>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <br />
      <button type="button" onClick={handleAddNew}>
        New
      </button>
      {notes.length > 0 && (
        <>
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
          <button type="button" onClick={handleDeleteAllNotes}>
            Delete All Notes
          </button>
        </>
      )}
    </div>
  );
};

export default NotesList;

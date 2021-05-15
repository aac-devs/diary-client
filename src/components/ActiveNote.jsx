import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deactiveNote,
  startDeleting,
  startSaveNote,
} from '../actions/notes.actions';
import useCustomForm from '../hooks/useCustomForm';
import NoteAppbar from './NoteAppbar';
// import { NothingSelected } from './NothingSelected';

const ActiveNote = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useCustomForm(note);
  const { title, body } = formValues;

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
    dispatch(startDeleting(note.id));
    dispatch(deactiveNote());
  };

  return (
    <div
      style={{
        width: `${300}px`,
        border: '1px solid black',
      }}
    >
      <div>
        <NoteAppbar
          date={note.date}
          showDeleteButton={!!note.id}
          showSaveButton={note.title !== title || note.body !== body}
          handleSaveNote={handleSaveNote}
          handleDeleteNote={handleDeleteNote}
        />
        <>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Some awesome title"
            onChange={handleInputChange}
          />
          <textarea
            name="body"
            value={body}
            onChange={handleInputChange}
            placeholder="What happened today??"
          />
          <button type="button" onClick={handleBackToList}>
            back
          </button>
        </>
      </div>
      {/* {!active && <NothingSelected />} */}
    </div>
  );
};

export default ActiveNote;

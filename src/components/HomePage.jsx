import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingNotes } from '../actions/notes.actions';
import ActiveNote from './ActiveNote';
import NotesList from './NotesList';
import NothingSelected from './NothingSelected';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { active } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(startLoadingNotes());
  }, [dispatch]);

  return (
    <>
      {loading && <h5>Espere...</h5>}
      <NotesList />
      {active && <ActiveNote />}
      {!active && <NothingSelected />}
    </>
  );
};

export default HomePage;

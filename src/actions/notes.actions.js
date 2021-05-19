/* eslint-disable no-console */
import dayjs from 'dayjs';
import { fetchWithToken } from '../helpers/fetch';
import fileUpload from '../helpers/fileUpload';
import types from '../types/types';
import {
  finishLoading,
  removeError,
  removeSuccess,
  setError,
  setSuccess,
  startLoading,
} from './ui.actions';

// Carga la lista de notas leídas desde el backend a la lista del redux
const loadNotes = (notes) => ({
  type: types.notes.load,
  payload: notes,
});

const arrangeNotesList = (notes) => {
  return notes.map((n) => {
    const { createdAt, updatedAt, uid, ...rest } = n;
    rest.date = dayjs(createdAt).format('MM-DD-YYYY');
    return rest;
  });
};

// Inicia la petición al backend para cargar todas las notas del usuario logueado
export const startLoadingNotes = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      dispatch(removeSuccess());
      const resp = await fetchWithToken('/notes');
      const { ok, notes, msg, error } = await resp.json();
      if (ok) {
        dispatch(loadNotes(arrangeNotesList(notes.rows)));
        dispatch(setSuccess('Notes readed successfully!'));
      } else {
        const message = msg || error || '';
        dispatch(setError(message));
      }
    } catch (error) {
      console.log('Something went wrong fetching data!');
      dispatch(setError('Something went wrong fetching data!'));
    }
    dispatch(finishLoading());
  };
};

// Carga la nota activa del redux con la nota que se desea actualizar
export const activeNote = (id, note) => ({
  type: types.notes.active,
  payload: {
    id,
    ...note,
  },
});

// Limpia la nota activa del redux
export const deactiveNote = () => ({
  type: types.notes.unactive,
});

// Carga la nota activa del redux con una nueva nota que se desea crear
export const selectNewNote = () => {
  return async (dispatch) => {
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      image: '',
    };
    dispatch(activeNote(null, newNote));
  };
};

// Agrega una nueva nota a la lista de notas del redux
const addNewNote = (id, note) => ({
  type: types.notes.addNew,
  payload: {
    id,
    ...note,
  },
});

// Actualiza la lista de notas del redux
const refreshNote = (id, note) => ({
  type: types.notes.updated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

// Inicia la petición al backend para crear una nueva nota o para actualizar una ya existente
export const startSaveNote = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      dispatch(removeSuccess());
      const {
        active: { id, image },
      } = getState().notes;
      const newData = data;
      newData.image = image;
      const endpoint = id ? `/notes/${id}` : '/notes';
      const method = id ? 'PUT' : 'POST';
      const resp = await fetchWithToken(endpoint, newData, method);
      const { ok, note, msg, error } = await resp.json();
      if (ok) {
        const { id: newId, uid, updatedAt, createdAt, ...rest } = note;
        rest.date = createdAt;
        if (method === 'POST') {
          dispatch(addNewNote(newId, rest));
          dispatch(setSuccess('Note created successfully!'));
        } else {
          dispatch(refreshNote(newId, rest));
          dispatch(setSuccess('Note updated successfully!'));
        }
        dispatch(activeNote(newId, rest));
      } else {
        const message = msg || error || '';
        dispatch(setError(message));
      }
    } catch (error) {
      console.log('Something went wrong fetching data!');
      dispatch(setError('Something went wrong fetching data!'));
    }
    dispatch(finishLoading());
  };
};

// Limpia la lista de notas, la nota activa, etc. del redux, cuando el usuario cierra sesión
export const noteLogout = () => ({
  type: types.notes.logoutCleaning,
});

// Borra la nota de las lista de notas del redux
const deleteNote = (id) => ({
  type: types.notes.delete,
  payload: id,
});

// Inicia la petición al backend para la eliminación de una nota
export const startDeleting = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      dispatch(removeSuccess());
      const resp = await fetchWithToken(`/notes/${id}`, undefined, 'DELETE');
      const { ok, msg } = await resp.json();
      if (ok) {
        dispatch(deleteNote(id));
        dispatch(setSuccess('Note deleted successfully!'));
      } else {
        dispatch(setError(msg));
      }
    } catch (error) {
      console.log('Something went wrong fetching data!');
      dispatch(setError('Something went wrong fetching data!'));
    }
    dispatch(finishLoading());
  };
};

// Inicia la petición al backend para la eliminación de todas las notas
export const startDeleteAllNotes = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      dispatch(removeSuccess());
      const resp = await fetchWithToken('/notes', undefined, 'DELETE');
      const { ok, msg } = await resp.json();
      if (ok) {
        dispatch(noteLogout());
        dispatch(setSuccess('Notes deleted successfully!'));
      } else {
        dispatch(setError(msg));
      }
    } catch (error) {
      console.log('Something went wrong fetching data!');
      dispatch(setError('Something went wrong fetching data!'));
    }
    dispatch(finishLoading());
  };
};

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      dispatch(removeSuccess());
      const { active } = getState().notes;
      const fileUrl = await fileUpload(file);
      active.image = fileUrl;
      const { id, ...rest } = active;
      dispatch(activeNote(id, rest));
      dispatch(setSuccess('Image loaded successfully!'));
    } catch (error) {
      console.log('Something went wrong fetching data!');
      dispatch(setError('Something went wrong fetching data!'));
    }
    dispatch(finishLoading());
  };
};

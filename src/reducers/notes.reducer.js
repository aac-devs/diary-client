/*
  {
    notes: [],
    active: null,
    active: {
      id: 'fdahgdaodfjaklga4578safd',
      title: '',
      body: '',
      imageUrl: '',
      date: 124848338754
    }
  }
*/

import types from '../types/types';

const initialState = {
  count: 0,
  notes: [],
  active: null,
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notes.active:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notes.unactive:
      return {
        ...state,
        active: null,
      };
    case types.notes.addNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case types.notes.load:
      return {
        ...state,
        count: action.payload.length,
        notes: action.payload,
      };
    case types.notes.updated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note,
        ),
      };
    case types.notes.delete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case types.notes.logoutCleaning:
      return {
        ...state,
        count: 0,
        notes: [],
        active: null,
      };
    default:
      return state;
  }
};

export default notesReducer;

import types from '../types/types';

export const setError = (err) => ({
  type: types.ui.setError,
  payload: err,
});

export const removeError = () => ({
  type: types.ui.removeError,
});

export const setSuccess = (success) => ({
  type: types.ui.setSuccess,
  payload: success,
});

export const removeSuccess = () => ({
  type: types.ui.removeSuccess,
});

export const startLoading = () => ({
  type: types.ui.startLoading,
});

export const finishLoading = () => ({
  type: types.ui.finishLoading,
});

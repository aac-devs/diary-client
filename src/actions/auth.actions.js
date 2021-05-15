import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import types from '../types/types';
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from './ui.actions';

const login = ({ uid, userName: name }) => ({
  type: types.auth.login,
  payload: { uid, name },
});

const startChecking = () => ({
  type: types.auth.startChecking,
});

const finishChecking = () => ({
  type: types.auth.finishChecking,
});

const startAuthenticate = () => {
  return async (dispatch) => {
    try {
      dispatch(startChecking());
      dispatch(removeError());
      dispatch(startLoading());
      const resp = await fetchWithToken('/auth');
      const { ok, uid, name, token, msg, error } = await resp.json();
      if (ok) {
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(login({ uid, name }));
      } else {
        const message = msg || error || '';
        dispatch(setError(message));
      }
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(finishChecking());
    dispatch(finishLoading());
  };
};

const startRegister = (data) => {
  return async (dispatch) => {
    try {
      dispatch(removeError());
      dispatch(startLoading());
      const resp = await fetchWithoutToken('/auth/new', data, 'POST');
      const { ok, uid, name, token, msg, error } = await resp.json();
      if (ok) {
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(login({ uid, name }));
      } else {
        const message = msg || error || '';
        dispatch(setError(message));
      }
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(finishLoading());
  };
};

export { startAuthenticate, startRegister };

// import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
// import types from '../types/types';
// import { noteLogout } from './notes.actions';
// import {
//   finishLoading,
//   removeError,
//   setError,
//   startLoading,
// } from './ui.actions';

// const startChecking = () => ({
//   type: types.auth.startChecking,
// });

// const login = ({ uid, userName: name }) => ({
//   type: types.auth.login,
//   payload: { uid, name },
// });

// const finishChecking = () => ({
//   type: types.auth.finishChecking,
// });

// const optionFetch = (type, name, email, password) => {
//   switch (type) {
//     case 'renew':
//       console.log(fetchWithToken('auth'));
//       break;
//     case 'login':
//       fetchWithoutToken('auth', { email, password }, 'POST');
//       break;
//     default:
//       fetchWithoutToken('auth/new', { name, email, password }, 'POST');
//       break;
//   }
// };

// (type === "renew"
//   ? fetchWithToken("auth/renew")
//   : type === "login"
//   ? fetchWithoutToken("auth", { email, password }, "POST")
//   : fetchWithoutToken("auth/new", { name, email, password }, "POST"));
// export const startAuth = (type = 'renew', email, password, name) => {
//   return async (dispatch) => {
//     dispatch(startChecking());
//     dispatch(startLoading());
//     dispatch(removeError());
// console.log({ type });
// const resp = await optionFetch(type, name, email, password);
// console.log({ resp });
// const body = await resp.json();
// const { ok, uid, name: userName, token, msg, errors } = body;
// try {
//   console.log({ msg });
//   if (ok) {
//     localStorage.setItem('token', token);
//     localStorage.setItem('token-init-date', new Date().getTime());
//     dispatch(login({ uid, userName }));
//   } else {
//     const message = msg || errors || '';
//     dispatch(setError(message));
//   }
//   console.log('llega hasta acá');
//   dispatch(finishLoading());
//   dispatch(finishChecking());
// } catch (error) {
//   // eslint-disable-next-line no-console
//   console.log('Something went wrong fetching data!');
// }
//   };
// };

// export const logout = () => ({
//   type: types.auth.logout,
// });

// export const startLogout = () => {
//   return async (dispatch) => {
//     dispatch(startLoading());
//     dispatch(removeError());
//     localStorage.removeItem('token');
//     localStorage.removeItem('token-init-date');
//     dispatch(logout());
//     dispatch(noteLogout());
//     dispatch(finishLoading());
//   };
// };

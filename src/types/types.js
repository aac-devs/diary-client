const types = {
  auth: {
    startChecking: '[Auth] Start checking',
    finishChecking: '[Auth] Finish Checking',
    login: '[Auth] Login',
    logout: '[Auth] Logout',
  },
  ui: {
    setError: '[UI] Set error',
    removeError: '[UI] Remove error',
    setSuccess: '[UI] Set success',
    removeSuccess: '[UI] Remove success',
    startLoading: '[UI] Start loading',
    finishLoading: '[UI] Finish loading',
  },
  notes: {
    addNew: '[Notes] New note',
    active: '[Notes] Set active note',
    unactive: '[Notes] Set unactive note',
    load: '[Notes] Load notes',
    updated: '[Notes] Updated note',
    delete: '[Notes] Delete note',
    logoutCleaning: '[Notes] Logout cleaning',
  },
};

export default types;

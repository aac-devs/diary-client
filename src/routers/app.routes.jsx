import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { startAuthenticate } from '../actions/auth.actions';
// import startLogin from '../actions/auth.actions';
// import { startAuth } from '../actions/auth.actions';
import HomePage from '../components/HomePage';
import AuthRouter from './auth.routes';
import PrivateRoute from './private.routes';
import PublicRoute from './public.routes';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, logged: isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // dispatch(startAuth());
    dispatch(startAuthenticate());
  }, []);

  if (checking) {
    return <h5>Espere...</h5>;
  }
  console.log('renderiza...');

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/"
            component={HomePage}
            isAuthenticated={isLoggedIn}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;

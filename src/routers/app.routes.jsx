import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { startAuthenticate } from '../actions/auth.actions';
import HomePage from '../components/HomePage';
import Loading from '../components/Loading';
import AuthRouter from './auth.routes';
import PrivateRoute from './private.routes';
import PublicRoute from './public.routes';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, logged: isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startAuthenticate());
  }, []);

  if (checking) {
    return <Loading />;
  }

  return (
    <Router>
      <div style={{ height: '100%' }}>
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

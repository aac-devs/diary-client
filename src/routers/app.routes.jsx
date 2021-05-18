import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { startAuthenticate } from '../actions/auth.actions';
// import startLogin from '../actions/auth.actions';
// import { startAuth } from '../actions/auth.actions';
import HomePage from '../components/HomePage';
import Loading from '../components/Loading';
import AuthRouter from './auth.routes';
import PrivateRoute from './private.routes';
import PublicRoute from './public.routes';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, logged: isLoggedIn } = useSelector((state) => state.auth);
  // const { loading } = useSelector((state) => state.ui);

  useEffect(() => {
    // dispatch(startAuth());
    dispatch(startAuthenticate());
  }, []);

  // console.log({ loading });
  if (checking) {
    console.log({ checking, isLoggedIn });
    return <Loading />;
  }
  console.log({ checking, isLoggedIn });
  // console.log({ checking });
  console.log('renderiza...');

  return (
    <Router>
      {/* {loading && <h5>Loading..</h5>} */}
      <div style={{ height: '100%' }}>
        <Switch>
          {/* <h1>Renderizado</h1> */}
          {/* {isLoggedIn ? <Route exact path="/" component={HomePage} /> : null} */}

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

import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/register" component={RegisterPage} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};

export default AuthRouter;

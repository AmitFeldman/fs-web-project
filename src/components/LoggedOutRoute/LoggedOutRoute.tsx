import React, {FC} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

const LoggedOutRoute: FC<RouteProps> = ({...rest}) => {
  const {isUserLoggedIn} = useAuth();

  if (isUserLoggedIn()) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};

export default LoggedOutRoute;

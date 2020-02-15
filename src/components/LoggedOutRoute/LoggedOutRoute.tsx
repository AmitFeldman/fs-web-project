import React, {FC} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

const LoggedOutRoute: FC<RouteProps> = ({children, ...rest}) => {
  const {isUserLoggedIn} = useAuth();

  return (
    <Route
      {...rest}
      render={() => (isUserLoggedIn() ? <Redirect to="/" /> : children)}
    />
  );
};

export default LoggedOutRoute;

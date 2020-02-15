import React, {FC} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

const LoggedInRoute: FC<RouteProps> = ({children, ...rest}) => {
  const {isUserLoggedIn} = useAuth();

  return (
    <Route
      {...rest}
      render={() => (isUserLoggedIn() ? children : <Redirect to="/login" />)}
    />
  );
};

export default LoggedInRoute;

import React, {FC} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

const AdminRoute: FC<RouteProps> = ({children, ...rest}) => {
  const {isUserAdmin} = useAuth();

  return (
    <Route
      {...rest}
      render={() => (isUserAdmin() ? children : <Redirect to="/error" />)}
    />
  );
};

export default AdminRoute;

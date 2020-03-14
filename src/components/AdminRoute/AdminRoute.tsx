import React, {FC} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

const AdminRoute: FC<RouteProps> = ({...rest}) => {
  const {isUserAdmin} = useAuth();

  if (!isUserAdmin()) {
    return <Redirect to="/error" />;
  }

  return <Route {...rest} />;
};

export default AdminRoute;

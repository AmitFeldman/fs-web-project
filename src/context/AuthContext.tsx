import React, {createContext, useState, FC, useEffect, useContext} from 'react';
import {
  removeToken,
  setToken,
  getUser,
  getLocalUser,
} from '../utils/auth-client';
import * as usersApi from '../utils/users-api';
import {LoginBody, RegisterBody, User} from '../utils/users-api';

type OptionalUser = User | null;

export enum UserStatus {
  NONE = 'none',
  USER = 'user',
  ADMIN = 'admin',
}

const getUserStatus = (user: OptionalUser) => {
  if (!user) {
    return UserStatus.NONE;
  }

  return user.isAdmin ? UserStatus.ADMIN : UserStatus.USER;
};

interface AuthContextData {
  user: OptionalUser;
  getUserStatus: () => UserStatus;
  isUserLoggedIn: () => boolean;
  isUserAdmin: () => boolean;
  login: (data: LoginBody) => Promise<void>;
  register: (data: RegisterBody) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  getUserStatus: () => UserStatus.NONE,
  isUserLoggedIn: () => false,
  isUserAdmin: () => false,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const AuthProvider: FC<any> = props => {
  const [user, setUser] = useState<OptionalUser>(getLocalUser());
  const userStatus = getUserStatus(user);

  const reloadUser = () => {
    getUser().then(user => {
      setUser(user);
    });
  };

  useEffect(() => {
    reloadUser();
  }, []);

  const login = (data: LoginBody) =>
    usersApi
      .login(data)
      .then(setToken)
      .then(reloadUser);

  const register = (data: RegisterBody) =>
    usersApi
      .register(data)
      .then(setToken)
      .then(reloadUser);

  const logout = () => removeToken().then(reloadUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        getUserStatus: () => userStatus,
        isUserAdmin: () => userStatus === UserStatus.ADMIN,
        isUserLoggedIn: () => userStatus !== UserStatus.NONE,
      }}
      {...props}
    />
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
};

export {AuthProvider, useAuth};

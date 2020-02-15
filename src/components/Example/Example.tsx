import React, {FC} from 'react';
import {LoginBody, RegisterBody} from '../../utils/users-api';
import {useAuth} from '../../context/auth-context';

const Example: FC<{}> = () => {
  const {login, register, logout, user, getUserStatus} = useAuth();

  const testData: RegisterBody = {
    email: 'samuel@gmail.com',
    password: '123',
    username: 'samuel',
  };

  const loginData: LoginBody = {
    email: 'samuel@gmail.com',
    password: '123',
  };

  return (
    <div>
      <h1>{getUserStatus()}</h1>
      <h1>{user?.username}</h1>
      <button onClick={() => register(testData)}>Register</button>
      <button onClick={() => login(loginData)}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Example;

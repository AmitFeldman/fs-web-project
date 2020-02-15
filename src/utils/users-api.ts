import client from './api-client';

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

export type RegisterBody = Pick<User, 'username' | 'password' | 'email'>;

const register = async (registerData: RegisterBody): Promise<User> => {
  return await client<RegisterBody, User>('users/register', {
    body: registerData,
  });
};

export type LoginBody = Pick<User, 'email' | 'password'>;

const login = async (loginData: LoginBody): Promise<User> => {
  return await client<LoginBody, User>('users/login', {
    body: loginData,
  });
};

const findUserById = async (id: User['_id']): Promise<User> => {
  return await client<{}, User>(`users/id/${id}`);
};

export {register, login, findUserById};

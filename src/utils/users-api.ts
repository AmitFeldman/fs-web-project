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

export type LoginBody = Pick<User, 'username' | 'password'>;

const login = async (loginData: LoginBody): Promise<User> => {
  return await client<LoginBody, User>('users/login', {
    body: loginData,
  });
};

// Returns the user that is logged on by token
const getMe = async (): Promise<User> => {
  return await client<{}, User>('users/me');
};

const getUserByUsername = async (username: User['username']): Promise<User> => {
  return await client<{}, User>(`users/username/${username}`);
};

export {register, login, getUserByUsername, getMe};

import {postApi} from './api-requests';

enum UserAPI {
  REGISTER = 'users/register',
  LOGIN = 'users/login',
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
}

const register = async (registerData: RegisterData) => {
  const response = await postApi<RegisterData, {}>(
    UserAPI.REGISTER,
    registerData
  );
};

export interface LoginData {
  email: string;
  password: string;
}

const login = async (loginData: LoginData) => {
  const response = await postApi<LoginData, {}>(UserAPI.LOGIN, loginData);
};

export {register, login};

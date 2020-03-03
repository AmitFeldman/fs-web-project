import {getMe, User} from './users-api';

const LOCAL_STORAGE_KEY = '__auth_token__';

const setToken = ({_id}: User) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, _id);
};

const getToken = (): string | null => {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY);
};

const removeToken = (): Promise<void> => {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  return Promise.resolve();
};

function getUser(): Promise<User | null> {
  const token = getToken();

  if (!token) {
    return Promise.resolve(null);
  }

  // TODO: Change id to token
  return getMe().catch(() => {
    removeToken();
    return Promise.resolve(null);
  });
}

export {setToken, getToken, removeToken, getUser};

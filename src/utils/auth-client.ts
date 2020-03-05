import {getMe, User} from './users-api';

const LOCAL_STORAGE_KEY = '__auth_token__';
const LOCAL_STORAGE_USER_KEY = '__local_user__';

const setToken = (user: User) => {
  const {_id} = user;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, _id);
  window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
};

const getToken = (): string | null => {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY);
};

const removeToken = (): Promise<void> => {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  return Promise.resolve();
};

// When the page is refreshed we send a request to get the logged on user by
// their token. We can use the local user that is also saved when setToken is
// called so that we don't have to redirect before the request is resolved
const getLocalUser = (): User | null => {
  const localUser = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY);

  if (localUser) return JSON.parse(localUser);

  return null;
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

export {setToken, getToken, removeToken, getUser, getLocalUser};

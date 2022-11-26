import { JwtUtils, StorageUtils } from '../utils';

const ACCESS_TOKEN_KEY = 'access_token';

export const setToken = (token: string) => {
  StorageUtils.set(ACCESS_TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return StorageUtils.get(ACCESS_TOKEN_KEY);
};

export const removeToken = () => {
  StorageUtils.remove(ACCESS_TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  if (token === null) {
    return false;
  }
  return JwtUtils.isTokenValid(token);
};

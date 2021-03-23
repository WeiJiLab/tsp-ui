import { JwtUtils, StorageUtils } from "../utils";
import { ObjectUtils } from "../utils";

const ACCESS_TOKEN_key = 'access_token';

export const setToken = (token: String) => {
  StorageUtils.set(ACCESS_TOKEN_key, token);
}

export const getToken = (): string | null => {
  return StorageUtils.get(ACCESS_TOKEN_key);
}

export const removeToken = () => {
  StorageUtils.remove(ACCESS_TOKEN_key);
}

export const isAuthenticated = () => {
  const token = getToken();
  if (ObjectUtils.isEmpty(token)) {
    return false;
  }
  return JwtUtils.isTokenValid(token!);
};
